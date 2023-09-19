import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "services/cryptoApi";
// import LineChart from "./LineChart";
import styles from "./Cryptocurrency.module.css";
import Loader from "components/Loader";
import { NumericFormat } from "react-number-format";

function Cryptocurrency() {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const coin = data?.data?.coin;

  if (!coin) return <Loader />;
  console.log(coin);

  const stats = [
    { id: 1, key: "marketCap", name: "Market Cap" },
    {
      id: 2,
      key: "circulating",
      name: "Circulating Supply",
      supply: true,
    },
    { id: 3, key: "fullyDilutedMarketCap", name: "Fully Diluted Valuation" },
    {
      id: 4,
      key: "total",
      name: "Total Supply",
      supply: true,
    },
    { id: 5, key: "24hVolume", name: "24h Trading Volume" },
    {
      id: 6,
      key: "max",
      name: "Max Supply",
      supply: true,
    },
  ];
  return (
    <section className="flex flex-col mt-6 mb-12">
      <ul className="flex flex-col mb-4">
        <li className="mb-4 p-2 bg-slate-400 bg-opacity-10 rounded-lg max-w-fit">
          <p className="font-semibold">Rank #{coin.rank}</p>
        </li>
        <li className="flex items-center space-x-3 mb-4">
          <img
            className="h-12 w-12"
            src={coin.iconUrl}
            alt={`${coin.name} Icon`}
          />
          <p className="text-3xl font-bold">{coin.name}</p>
          <p className="text-textGray text-xl">{coin.symbol}</p>
        </li>
        <li className="flex items-center space-x-4 mb-4">
          <NumericFormat
            className="dark:text-neutral-300 text-3xl font-bold"
            value={parseFloat(coin.price)}
            prefix={"$"}
            thousandSeparator=","
            decimalScale={2}
            fixedDecimalScale={true}
            displayType="text"
          />
          {coin.change < 0.0 ? (
            <p
              className={`${styles.change__text} text-red-600 dark:text-red-600`}
            >
              <span className="w-0 h-0 border-l-[5px] border-l-transparent border-t-[8px] border-t-red-600 border-r-[5px] border-r-transparent mr-1" />
              <NumericFormat
                value={Math.abs(coin.change)}
                suffix={"%"}
                thousandSeparator=","
                decimalScale={2}
                displayType="text"
              />
            </p>
          ) : coin.change > 0.0 ? (
            <p
              className={`${styles.change__text} text-green-600 dark:text-green-600`}
            >
              <span className="w-0 h-0 border-l-[5px] border-l-transparent border-b-[8px] border-b-green-600 border-r-[5px] border-r-transparent mr-1" />
              <NumericFormat
                value={coin.change}
                suffix={"%"}
                thousandSeparator=","
                decimalScale={2}
                displayType="text"
              />
            </p>
          ) : (
            <p className={styles.change__text}>
              <NumericFormat
                value={Math.abs(coin.change)}
                suffix={"%"}
                thousandSeparator=","
                decimalScale={2}
                displayType="text"
              />
            </p>
          )}
        </li>
        <li>
          <NumericFormat
            className="text-textGray"
            value={coin.btcPrice}
            suffix={" BTC"}
            thousandSeparator=","
            decimalScale={2}
            displayType="text"
          />
        </li>
      </ul>
      <ul className="grid grid-cols-2">
        {stats.map((stat) => (
          <div className="flex flex-col font-semibold" key={stat.id}>
            <h2>{stat.name}:</h2>
            {isFetching ? (
              <span className="animate-skeleton w-48 h-7" />
            ) : (
              <NumericFormat
                className="text-accent text-xl"
                value={
                  stat.supply === true ? coin.supply[stat.key] : coin[stat.key]
                }
                thousandSeparator=","
                prefix={
                  stat.key === "marketCap" ||
                  stat.key === "24hVolume" ||
                  stat.key === "fullyDilutedMarketCap"
                    ? "$"
                    : ""
                }
                suffix={stat.key === "btcDominance" ? "%" : ""}
                displayType="text"
                decimalScale={2}
              />
            )}
          </div>
        ))}
      </ul>
    </section>
  );
}

export default Cryptocurrency;
