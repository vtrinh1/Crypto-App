import React, { useState } from "react";
import defaultNewsImage from "assets/images/default-news-image.jpg";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import moment from "moment";

function NewsCard({ data, isFetching, simplified }) {
  const [imageLoaded, setImageLoaded] = useState(
    new Array(data.length).fill(false)
  );

  const handleImageLoad = (index) => {
    const updatedImageLoaded = [...imageLoaded];
    updatedImageLoaded[index] = true;
    setImageLoaded(updatedImageLoaded);
  };

  return (
    <>
      {!isFetching &&
        data.map((news, index) => (
          <a
            className="flex flex-col space-y-6 justify-between hover:bg-slate-200 hover:bg-opacity-40 p-4 rounded-xl dark:hover:bg-neutral-800"
            href={news.url}
            target="_blank"
            rel="noreferrer"
            key={index}
          >
            <div className="flex flex-col space-y-2">
              <img
                className={`h-48 w-full object-cover rounded-xl mb-4 ${
                  imageLoaded[index] ? "" : "animate-skeleton-image"
                }`}
                src={news?.image?.contentUrl || defaultNewsImage}
                alt="news"
                onLoad={() => handleImageLoad(index)}
              />
              <h2 className="font-bold mb-2">{news.name}</h2>
              <p className="font-semibold text-textDarkGray overflow-hidden h-[72px]">
                {news.description}
              </p>
            </div>
            <div className="flex justify-between items-center text-textDarkGray">
              <div className="flex space-x-2 font-semibold">
                <UserCircleIcon className="w-6 dark:text-neutral-300 transition-colors" />
                <p>{news.provider[0].name}</p>
              </div>
              <p className="text-textGray text-sm">
                {moment().diff(news.datePublished, "days") < 7
                  ? moment(news.datePublished).startOf("ss").fromNow()
                  : moment(news.datePublished).format("MMM D")}
              </p>
            </div>
          </a>
        ))}
      {isFetching &&
        new Array(simplified ? 3 : 6).fill(0).map((_, index) => (
          <div key={index} className="flex flex-col space-y-6 p-4">
            <span className="h-48 w-full rounded-xl animate-skeleton-image" />
            <div className="flex flex-col space-y-4">
              <span className="h-12 w-full rounded-xl animate-skeleton" />
              <span className="h-[72px] w-full rounded-xl animate-skeleton" />
            </div>
            <span className="h-6 mt-6 w-full rounded-xl animate-skeleton" />
          </div>
        ))}
    </>
  );
}

export default NewsCard;
