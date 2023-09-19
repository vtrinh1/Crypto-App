import React, { Fragment, useEffect, useState } from "react";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import styles from "./Cryptocurrencies.module.css";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import CryptoCard from "./CryptocurrencyCard";

function Cryptocurrencies({ simplified }) {
  const orderByKeys = [
    { id: 1, key: "marketCap", name: "Market Cap" },
    { id: 2, key: "price", name: "Price" },
    { id: 3, key: "24hVolume", name: "24h Volume" },
    { id: 4, key: "change", name: "Change" },
  ];

  const limits = [500, 200, 100, 50, 20, 10];

  const [selectedOrderByKey, setSelectedOrderByKey] = useState(orderByKeys[0]);
  const [selectedLimit, setSelectedLimit] = useState(
    simplified ? limits[5] : limits[2]
  );
  const { data: cryptosList, isFetching } = useGetCryptosQuery({
    selectedOrderByKey,
  });

  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // sorting states where number ascending is default
  const [sortByNumberAscending, setSortByNumberAscending] = useState(true);
  const [sortByNameAscending, setSortByNameAscending] = useState(null);
  const [sortByPriceAscending, setSortByPriceAscending] = useState(null);
  const [sortByChangeAscending, setSortByChangeAscending] = useState(null);
  const [sortByMarketCapAscending, setSortByMarketCapAscending] =
    useState(null);
  const [sortByVolumeAscending, setSortByVolumeAscending] = useState(null);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredData) {
      const sortedData = filteredData.sort((a, b) => {
        if (sortByNumberAscending) {
          return a.rank - b.rank;
        } else if (sortByNumberAscending === false) {
          return b.rank - a.rank;
        } else if (sortByNameAscending) {
          return b.name.localeCompare(a.name);
        } else if (sortByNameAscending === false) {
          return a.name.localeCompare(b.name);
        } else if (sortByPriceAscending) {
          return a.price - b.price;
        } else if (sortByPriceAscending === false) {
          return b.price - a.price;
        } else if (sortByChangeAscending) {
          return a.change - b.change;
        } else if (sortByChangeAscending === false) {
          return b.change - a.change;
        } else if (sortByMarketCapAscending) {
          return a.marketCap - b.marketCap;
        } else if (sortByMarketCapAscending === false) {
          return b.marketCap - a.marketCap;
        } else if (sortByVolumeAscending) {
          return a["24hVolume"] - b["24hVolume"];
        } else if (sortByVolumeAscending === false) {
          return b["24hVolume"] - a["24hVolume"];
        } else return [];
      });

      setCryptos(sortedData.slice(0, selectedLimit));
    }
  }, [
    cryptosList,
    searchTerm,
    selectedLimit,
    sortByNumberAscending,
    sortByNameAscending,
    sortByPriceAscending,
    sortByChangeAscending,
    sortByMarketCapAscending,
    sortByVolumeAscending,
  ]);

  const handleSortByNumberClick = () => {
    setSortByNumberAscending((prevValue) =>
      prevValue === null ? true : !prevValue
    );
    setSortByNameAscending(null);
    setSortByPriceAscending(null);
    setSortByChangeAscending(null);
    setSortByMarketCapAscending(null);
    setSortByVolumeAscending(null);
  };

  const handleSortByNameClick = () => {
    setSortByNameAscending((prevValue) =>
      prevValue === null ? true : !prevValue
    );
    setSortByNumberAscending(null);
    setSortByPriceAscending(null);
    setSortByChangeAscending(null);
    setSortByMarketCapAscending(null);
    setSortByVolumeAscending(null);
  };

  const handleSortByPriceClick = () => {
    setSortByPriceAscending((prevValue) =>
      prevValue === null ? true : !prevValue
    );
    setSortByNameAscending(null);
    setSortByNumberAscending(null);
    setSortByChangeAscending(null);
    setSortByMarketCapAscending(null);
    setSortByVolumeAscending(null);
  };

  const handleSortByChangeClick = () => {
    setSortByChangeAscending((prevValue) =>
      prevValue === null ? true : !prevValue
    );
    setSortByNameAscending(null);
    setSortByNumberAscending(null);
    setSortByPriceAscending(null);
    setSortByMarketCapAscending(null);
    setSortByVolumeAscending(null);
  };

  const handleSortByMarketCapClick = () => {
    setSortByMarketCapAscending((prevValue) =>
      prevValue === null ? true : !prevValue
    );
    setSortByNameAscending(null);
    setSortByNumberAscending(null);
    setSortByPriceAscending(null);
    setSortByChangeAscending(null);
    setSortByVolumeAscending(null);
  };

  const handleSortByVolumeClick = () => {
    setSortByVolumeAscending((prevValue) =>
      prevValue === null ? true : !prevValue
    );
    setSortByNameAscending(null);
    setSortByNumberAscending(null);
    setSortByPriceAscending(null);
    setSortByChangeAscending(null);
    setSortByMarketCapAscending(null);
  };

  return (
    <section className="flex flex-col mt-6 mb-12">
      {!simplified && (
        <>
          <div className="flex font-bold text-3xl items-center mb-4">
            <h1 className="mr-4 mb-0">Today's Top Cryptocurrency by</h1>
            <Listbox
              value={selectedOrderByKey}
              onChange={setSelectedOrderByKey}
            >
              <div className="relative">
                <Listbox.Button
                  className={
                    "w-60 py-2 pl-4 pr-2 rounded-xl flex items-center justify-between bg-slate-400 bg-opacity-10 ring-1 ring-black ring-opacity-5 dark:text-neutral-300 transition-colors"
                  }
                >
                  {selectedOrderByKey.name}
                  <span className="flex items-center">
                    <ChevronUpDownIcon className="h-8" aria-hidden="true" />
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
                  <Listbox.Options className="absolute mt-2 w-full rounded-xl bg-white  font-semibold text-lg shadow-lg ring-1 ring-black ring-opacity-5 p-2">
                    {orderByKeys.map((orderByKey) => (
                      <Listbox.Option
                        key={orderByKey.id}
                        className="flex items-center justify-between relative cursor-pointer select-none py-2 px-4 rounded-xl hover:bg-slate-400 hover:bg-opacity-10"
                        value={orderByKey}
                      >
                        {orderByKey.name}
                        {selectedOrderByKey.id === orderByKey.id && (
                          <CheckIcon className="h-5" />
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className="w-full mb-4 flex items-center justify-between">
            <input
              className="input"
              placeholder="Search Cryptocurrency"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="listbox__wrapper">
              <div className="listbox__text">Show rows</div>
              <Listbox value={selectedLimit} onChange={setSelectedLimit}>
                <div className="listbox__button-wrapper">
                  <Listbox.Button className={"listbox__button w-16"}>
                    {selectedLimit}
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
                      {limits.map((limit) => (
                        <Listbox.Option
                          key={limit}
                          className="listbox__option"
                          value={limit}
                        >
                          {limit}
                          {selectedLimit === limit && (
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
      <ul className="flex px-2 font-bold text-lg py-4 border-slate-500 border-opacity-10 border-t-2 border-b-2">
        <li className="w-14">
          <div
            onClick={handleSortByNumberClick}
            className="group flex items-center space-x-2 cursor-pointer w-min"
          >
            <p>#</p>
            {sortByNumberAscending ? (
              <span
                className={`${styles.heading__caret_up} group-hover:opacity-100`}
              />
            ) : sortByNumberAscending === false ? (
              <span
                className={`${styles.heading__caret_down} group-hover:opacity-100`}
              />
            ) : (
              <span
                className={`${styles.heading__caret_placeholder} group-hover:opacity-100`}
              />
            )}
          </div>
        </li>
        <li className="w-1/5">
          <div
            onClick={handleSortByNameClick}
            className="group flex items-center space-x-2 cursor-pointer w-min"
          >
            <p>Name</p>
            {sortByNameAscending ? (
              <span
                className={`${styles.heading__caret_up} group-hover:opacity-100`}
              />
            ) : sortByNameAscending === false ? (
              <span
                className={`${styles.heading__caret_down} group-hover:opacity-100`}
              />
            ) : (
              <span
                className={`${styles.heading__caret_placeholder} group-hover:opacity-100`}
              />
            )}
          </div>
        </li>
        <li className="w-1/12 flex justify-end">
          <div
            onClick={handleSortByPriceClick}
            className="group flex items-center space-x-2 cursor-pointer w-min"
          >
            {sortByPriceAscending ? (
              <span
                className={`${styles.heading__caret_up} group-hover:opacity-100`}
              />
            ) : sortByPriceAscending === false ? (
              <span
                className={`${styles.heading__caret_down} group-hover:opacity-100`}
              />
            ) : (
              <span
                className={`${styles.heading__caret_placeholder} group-hover:opacity-100`}
              />
            )}
            <p>Price</p>
          </div>
        </li>
        <li className="w-1/12 flex justify-end">
          <div
            onClick={handleSortByChangeClick}
            className="group flex items-center space-x-2 cursor-pointer w-min"
          >
            {sortByChangeAscending ? (
              <span
                className={`${styles.heading__caret_up} group-hover:opacity-100`}
              />
            ) : sortByChangeAscending === false ? (
              <span
                className={`${styles.heading__caret_down} group-hover:opacity-100`}
              />
            ) : (
              <span
                className={`${styles.heading__caret_placeholder} group-hover:opacity-100`}
              />
            )}
            <p>24h</p>
          </div>
        </li>
        <li className="flex justify-end items-center w-1/6">
          <div
            onClick={handleSortByMarketCapClick}
            className="group flex items-center space-x-2 cursor-pointer"
          >
            {sortByMarketCapAscending ? (
              <span
                className={`${styles.heading__caret_up} group-hover:opacity-100`}
              />
            ) : sortByMarketCapAscending === false ? (
              <span
                className={`${styles.heading__caret_down} group-hover:opacity-100`}
              />
            ) : (
              <span
                className={`${styles.heading__caret_placeholder} group-hover:opacity-100`}
              />
            )}
            <p>Market Cap</p>
          </div>
          <div className="group relative">
            <InformationCircleIcon className="h-6 ml-1 text-gray-400 cursor-pointer relative" />
            <div className="absolute p-2">
              <span
                className={`${styles.heading__tooltip} group-hover:opacity-100 group-hover:visible`}
              >
                <p className="mb-2">
                  The total market value of a cryptocurrency's circulating
                  supply. It is analogous to the free-float capitalization in
                  the stock market.
                </p>
                <p>Market Cap = Current Price x Circulating Supply.</p>
              </span>
            </div>
          </div>
        </li>
        <li className="flex justify-end items-center w-1/6">
          <div
            onClick={handleSortByVolumeClick}
            className="group flex items-center space-x-2 cursor-pointer"
          >
            {sortByVolumeAscending ? (
              <span
                className={`${styles.heading__caret_up} group-hover:opacity-100`}
              />
            ) : sortByVolumeAscending === false ? (
              <span
                className={`${styles.heading__caret_down} group-hover:opacity-100`}
              />
            ) : (
              <span
                className={`${styles.heading__caret_placeholder} group-hover:opacity-100`}
              />
            )}
            <p>Volume(24)</p>
          </div>
          <div className="group relative">
            <InformationCircleIcon className="h-6 ml-1 text-gray-400 cursor-pointer relative" />
            <div className="absolute p-2">
              <span
                className={`${styles.heading__tooltip} group-hover:opacity-100 group-hover:visible`}
              >
                A measure of how much of a cryptocurrency was traded in the last
                24 hours.
              </span>
            </div>
          </div>
        </li>
      </ul>
      <div className="flex flex-col">
        <CryptoCard
          data={cryptos}
          isFetching={isFetching}
          selectedLimit={selectedLimit}
        />
      </div>
    </section>
  );
}

export default Cryptocurrencies;
