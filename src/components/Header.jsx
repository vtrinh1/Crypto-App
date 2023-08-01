import React from "react";
import { useGetGlobalStatsQuery } from "../services/cryptoApi";
import millify from "millify";
import Loader from "./Loader";

function Header() {
  const { data, isFetching } = useGetGlobalStatsQuery();
  const globalStats = data?.data;

  if (isFetching) return <Loader />;
  
  return (
    <div className="py-4 w-full max-w-[1370px] flex items-center justify-between">
      <div className="flex items-center space-x-4 font-semibold">
        <div>
          Cryptos:{" "}
          <span className="text-accent">
            {millify(globalStats.totalCoins)}+
          </span>
        </div>
        <div>
          Exchanges:{" "}
          <span className="text-accent">{globalStats.totalExchanges}</span>
        </div>
        <div>
          Markets:{" "}
          <span className="text-accent">
            {millify(globalStats.totalMarkets)}
          </span>
        </div>
        <div>
          Market Cap:{" "}
          <span className="text-accent">
            ${millify(globalStats.totalMarketCap)}
          </span>
        </div>
        <div>
          24h Volume:{" "}
          <span className="text-accent">
            ${millify(globalStats.total24hVolume)}
          </span>
        </div>
        <div>
          BTC Dominance:{" "}
          <span className="text-accent">
            {millify(globalStats.btcDominance)}%
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div>USD</div>
        <div>Night</div>
      </div>
    </div>
  );
}

export default Header;
