import React, { Fragment, useEffect, useState } from "react";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
// import { useGetCryptosQuery } from "../services/cryptoApi";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import NewsCard from "./NewsCard";

function News({ simplified }) {
  const sortByKeys = ["relevance", "date"];
  const [selectedLimit, setSelectedLimit] = useState(simplified ? 3 : 6);
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const [selectedSortByKey, setSelectedSortByKey] = useState(sortByKeys[0]);
  const [cryptoNews, setCryptoNews] = useState([]);
  const { data: cryptoNewsList, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    selectedSortByKey,
  });

  useEffect(() => {
    if (cryptoNewsList?.value) {
      setCryptoNews(cryptoNewsList.value.slice(0, selectedLimit));
    }
  }, [selectedLimit, cryptoNewsList]);

  useEffect(() => {
    setSelectedLimit(simplified ? 3 : 6);
  }, [selectedSortByKey, simplified]);

  const handleLoadMore = () => {
    setSelectedLimit(selectedLimit + 6);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    // Update newsCategory based on the form input
    const newCategory = e.target.category.value;
    setNewsCategory(newCategory);
  };

  return (
    <section className="page__wrapper">
      {!simplified && (
        <>
          <h1>Latest Cryptocurrency Updates</h1>
          <div className="flex justify-between mt-2 mb-6">
            <form onSubmit={handleCategorySubmit}>
              <input
                className="input"
                placeholder="Search Cryptocurrency"
                name="category"
              />
            </form>
            <div className="listbox__wrapper">
              <div className="listbox__text">Sort by</div>
              <Listbox
                value={selectedSortByKey}
                onChange={setSelectedSortByKey}
              >
                <div className="listbox__button-wrapper">
                  <Listbox.Button className={"listbox__button w-28"}>
                    {selectedSortByKey}
                    <span className="listbox__button-icon__wrapper">
                      <ChevronUpDownIcon
                        className="listbox__button-icon"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="listbox__options-wrapper">
                      {sortByKeys.map((sortByKey, index) => (
                        <Listbox.Option
                          key={index}
                          className="listbox__option"
                          value={sortByKey}
                        >
                          {sortByKey}
                          {selectedSortByKey === sortByKey && (
                            <CheckIcon className="listbox__options-icon" />
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
        </>
      )}
      <div className="grid grid-cols-3 gap-x-6 gap-y-12 mb-6">
        <NewsCard
          data={cryptoNews}
          isFetching={isFetching}
          simplified={simplified}
        />
      </div>
      {cryptoNews?.length < cryptoNewsList?.value.length && !simplified && (
        <div className="w-full flex justify-center">
          <button
            className="rounded-xl bg-accent text-white font-semibold py-4 w-64 hover:brightness-90 transition-all"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
}

export default News;
