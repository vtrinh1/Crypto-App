import React from "react";
import { Link } from "react-router-dom";
import { useGetGlobalStatsQuery } from "services/cryptoApi";
import { Cryptocurrencies, News } from "components";
import { NumericFormat } from "react-number-format";
import FireIcon from "assets/images/FireIcon.png";

function Home() {
  const { data, isFetching } = useGetGlobalStatsQuery();
  const globalStats = data?.data;

  const stats = [
    { id: 1, key: "totalCoins", name: "total cryptocurrencies" },
    { id: 2, key: "totalExchanges", name: "total exchanges" },
    { id: 3, key: "totalMarkets", name: "total markets" },
    { id: 4, key: "totalMarketCap", name: "total market cap" },
    { id: 5, key: "total24hVolume", name: "total 24h volume" },
    { id: 6, key: "btcDominance", name: "BTC dominance" },
  ];

  const coinBoxes = [
    {
      id: 1,
      key: "bestCoins",
      name: "best performing coins",
      icon: <img src={FireIcon} className="h-6 w-6" alt="Fire Icon" />,
    },
    { id: 2, key: "newestCoins", name: "newest coins", icon: "⭐️" },
  ];

  return (
    <div className="page__wrapper space-y-16">
      <section className="flex flex-col">
        <h1>Current Global Cryptocurrency Statistics</h1>
        <div className="grid grid-cols-3 gap-y-4">
          {stats.map((stat) => (
            <div className="flex flex-col font-semibold" key={stat.id}>
              <h2>{stat.name}:</h2>
              {isFetching ? (
                <span className="animate-skeleton w-48 h-7" />
              ) : (
                <NumericFormat
                  className="text-accent text-xl"
                  value={globalStats[stat.key]}
                  thousandSeparator=","
                  prefix={
                    stat.key === "totalMarketCap" ||
                    stat.key === "total24hVolume"
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
        </div>
      </section>

      <section className="flex flex-row space-x-4">
        {coinBoxes.map((coinBox) => (
          <div key={coinBox.id} className="w-1/2 rounded-lg shadow-xl p-8">
            <div className="flex items-center space-x-2 pb-4 border-slate-500 border-opacity-10 border-b-[1px]">
              <span className="h-6 w-6">{coinBox.icon}</span>
              <h2 className="font-bold">{coinBox.name}</h2>
            </div>
            <ul className="flex flex-col">
              {isFetching
                ? new Array(3).fill(0).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 py-2 pr-2 border-slate-500 border-opacity-10 border-b-[1px]"
                    >
                      <span className="animate-skeleton h-7 w-5 ml-1" />
                      <span className="animate-skeleton h-7 max-w-sm w-full" />
                    </div>
                  ))
                : globalStats[coinBox.key].map((newCoin, index) => (
                    <Link
                      to={`/crypto/${newCoin.uuid}`}
                      className="flex items-center font-semibold space-x-4 py-2 px-2 text-lg hover:text-textDark border-slate-500 border-opacity-10 border-b-[1px] hover:bg-slate-500 hover:bg-opacity-10"
                      key={newCoin.uuid}
                    >
                      <p className="text-textGray w-4">{index + 1}</p>
                      <img
                        className="h-6 w-6"
                        src={newCoin.iconUrl}
                        alt={`${newCoin.symbol} Icon`}
                      />
                      <p className="truncate">{newCoin.name}</p>
                      <p className="text-textGray text-sm">{newCoin.symbol}</p>
                    </Link>
                  ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <Link to="/cryptocurrencies">
          <h1 className="hover:text-accent">Today's Top Cryptocurrency</h1>
        </Link>
        <Cryptocurrencies simplified />
      </section>

      <section>
        <Link to="/news">
          <h1 className="hover:text-accent">Latest Cryptocurrency Updates</h1>
        </Link>
        <News simplified />
      </section>
    </div>
  );
}

export default Home;
