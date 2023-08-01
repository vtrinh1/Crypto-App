import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetGlobalStatsQuery } from "services/cryptoApi";
import { Cryptocurrencies, News } from "components";
import Loader from "components/Loader";
import styles from "./Home.module.css";
import { NumericFormat } from "react-number-format";
import FireIcon from "assets/images/FireIcon.png";

const { Title } = Typography;

function Home() {
  const { data, isFetching } = useGetGlobalStatsQuery();
  const globalStats = data?.data;

  if (isFetching) return <Loader />;

  console.log(globalStats.bestCoins);
  return (
    <div className="flex flex-col space-y-12">
      <div className="flex flex-col mt-8">
        <div className="text-3xl font-bold mb-4">
          Current Global Cryptocurrency Statistics
        </div>
        <div className="grid grid-cols-3 gap-y-4">
          <div className={styles.stats__wrapper}>
            <div className={styles.stats__title}>Total Cryptocurrencies:</div>
            <NumericFormat
              className={styles.stats__value}
              value={globalStats.totalCoins}
              thousandSeparator=","
              displayType="text"
            />
          </div>
          <div className={styles.stats__wrapper}>
            <div className={styles.stats__title}>Total Exchanges:</div>
            <NumericFormat
              className={styles.stats__value}
              value={globalStats.totalExchanges}
              thousandSeparator=","
              displayType="text"
            />
          </div>
          <div className={styles.stats__wrapper}>
            <div className={styles.stats__title}>Total Markets:</div>
            <NumericFormat
              className={styles.stats__value}
              value={globalStats.totalMarkets}
              thousandSeparator=","
              displayType="text"
            />
          </div>
          <div className={styles.stats__wrapper}>
            <div className={styles.stats__title}>Total Market Cap:</div>
            <NumericFormat
              className={styles.stats__value}
              value={globalStats.totalMarketCap}
              prefix={"$"}
              thousandSeparator=","
              displayType="text"
            />
          </div>
          <div className={styles.stats__wrapper}>
            <div className={styles.stats__title}>Total 24h Volume:</div>
            <NumericFormat
              className={styles.stats__value}
              value={globalStats.total24hVolume}
              prefix={"$"}
              thousandSeparator=","
              displayType="text"
            />
          </div>
          <div className={styles.stats__wrapper}>
            <div className={styles.stats__title}>BTC Dominance:</div>
            <div className={styles.stats__value}>
              {millify(globalStats.btcDominance)}%
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row space-x-4">
        <div className={styles.box__wrapper}>
          <div className="flex items-center space-x-2 mb-4">
            <img src={FireIcon} className="h-6 w-6" alt="Fire Icon" />
            <div className={styles.box__title}>Best Performing Coins</div>
          </div>
          <div className="flex flex-col">
            {globalStats.bestCoins.map((bestCoin, index) => (
              <Link
                to={`/crypto/${bestCoin.uuid}`}
                className={`flex items-center font-semibold space-x-4 py-2 px-2 text-lg hover:text-textDark border-slate-500 border-opacity-10 border-t-[1px] ${
                  index === 2 && "border-b-[1px]"
                } hover:bg-slate-500 hover:bg-opacity-10`}
                key={bestCoin.uuid}
              >
                <div className="text-textGray">{index + 1}</div>
                <img
                  className="h-6 w-6"
                  src={bestCoin.iconUrl}
                  alt={`${bestCoin.symbol} Icon`}
                />
                <div>{bestCoin.name}</div>
                <div className="text-textGray text-sm">{bestCoin.symbol}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.box__wrapper}>
          <div className="flex items-center space-x-2 mb-4">
            <span className="h-6 w-6">⭐️</span>
            <div className={styles.box__title}>Newest Coins</div>
          </div>
          <div className="flex flex-col">
            {globalStats.newestCoins.map((newCoin, index) => (
              <Link
                to={`/crypto/${newCoin.uuid}`}
                className={`flex items-center font-semibold space-x-4 py-2 px-2 text-lg hover:text-textDark border-slate-500 border-opacity-10 border-t-[1px] ${
                  index === 2 && "border-b-[1px]"
                } hover:bg-slate-500 hover:bg-opacity-10`}
                key={newCoin.uuid}
              >
                <div className="text-textGray">{index + 1}</div>
                <img
                  className="h-6 w-6"
                  src={newCoin.iconUrl}
                  alt={`${newCoin.symbol} Icon`}
                />
                <div>{newCoin.name}</div>
                <div className="text-textGray text-sm">{newCoin.symbol}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>
      </div>
      <News simplified /> */}
    </div>
  );
}

export default Home;
