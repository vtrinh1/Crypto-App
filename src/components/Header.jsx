import React from "react";
import { useGetGlobalStatsQuery } from "../services/cryptoApi";
import millify from "millify";

function Header() {
  const { data, isFetching } = useGetGlobalStatsQuery();
  const globalStats = data?.data;

  const stats = [
    { id: 1, key: "totalCoins", name: "cryptos" },
    { id: 2, key: "totalExchanges", name: "exchanges" },
    { id: 3, key: "totalMarkets", name: "markets" },
    { id: 4, key: "totalMarketCap", name: "market cap" },
    { id: 5, key: "total24hVolume", name: "24h volume" },
    { id: 6, key: "btcDominance", name: "BTC dominance" },
  ];

  return (
    <div className="py-4 w-full max-w-[1370px] flex items-center justify-between">
      <ul className="flex items-center space-x-4 font-semibold">
        {stats.map((stat) => (
          <li className="flex space-x-2" key={stat.id}>
            <p className="capitalize">{stat.name}:</p>
            {isFetching ? (
              <span className="w-12 bg-slate-200 rounded animate-pulse" />
            ) : (
              <span className="text-accent">
                {stat.name === "market cap" || stat.name === "24h volume"
                  ? "$"
                  : null}
                {millify(globalStats[stat.key])}
                {stat.name === "cryptos"
                  ? "+"
                  : stat.name === "BTC dominance" && "%"}
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-4">
        <div>USD</div>
        <div>Night</div>
      </div>
    </div>
  );
}

export default Header;
