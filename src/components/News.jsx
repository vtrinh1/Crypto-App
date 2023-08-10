import React, { useEffect, useState } from "react";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
// import { useGetCryptosQuery } from "../services/cryptoApi";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import defaultNewsImage from "assets/images/default-news-image.jpg";

function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const [sortByValue, setSortByValue] = useState("Relevance");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    sortByValue,
  });

  return (
    <section className="page__wrapper">
      <h1>Latest Cryptocurrency Updates</h1>
      <div className="flex justify-between mb-6">
        <p>search</p>
        <div>sort by</div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {cryptoNews
          ? cryptoNews.value.map((news) => (
              <a
                className="flex flex-col space-y-6 justify-between hover:bg-slate-200 hover:bg-opacity-40 p-4 rounded-xl"
                href={news.url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex flex-col space-y-2">
                  <img
                    className="h-48 w-full object-cover rounded-xl mb-4"
                    src={news?.image?.contentUrl || defaultNewsImage}
                    alt="news"
                  />
                  <h2 className="font-bold mb-2">{news.name}</h2>
                  <p className="font-semibold text-textDarkGray overflow-hidden h-[72px]">
                    {news.description}
                  </p>
                </div>
                <div className="flex justify-between items-center text-textDarkGray">
                  <div className="flex space-x-2 font-semibold">
                    <UserCircleIcon className="w-6" />
                    <p>{news.provider[0].name}</p>
                  </div>
                  <p className="text-textGray text-sm">
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </p>
                </div>
              </a>
            ))
          : new Array(6).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col space-y-6 p-4">
                <span className="h-48 w-full rounded-xl animate-skeleton-image" />
                <div className="flex flex-col space-y-4">
                  <span className="h-12 w-full rounded-xl animate-skeleton" />
                  <span className="h-[72px] w-full rounded-xl animate-skeleton" />
                </div>
                <span className="h-6 mt-6 w-full rounded-xl animate-skeleton" />
              </div>
            ))}
        {/* {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )} */}
      </div>
    </section>
  );
}

export default News;
