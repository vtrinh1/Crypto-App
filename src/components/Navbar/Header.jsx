import React, { useState } from "react";
import { useGetGlobalStatsQuery } from "services/cryptoApi";
import millify from "millify";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";

function Header() {
  const { data, isFetching } = useGetGlobalStatsQuery();
  const globalStats = data?.data;
  const [darkMode, setDarkMode] = useState(localStorage.theme);

  console.log(globalStats);
  const stats = [
    { id: 1, key: "totalCoins", name: "cryptos" },
    { id: 2, key: "totalExchanges", name: "exchanges" },
    { id: 3, key: "totalMarkets", name: "markets" },
    { id: 4, key: "totalMarketCap", name: "market cap" },
    { id: 5, key: "total24hVolume", name: "24h volume" },
    { id: 6, key: "btcDominance", name: "BTC dominance" },
  ];

  const toggleDarkMode = () => {
    if (darkMode === "dark") {
      setDarkMode("light");
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      setDarkMode("dark");
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }

    document.activeElement.blur();
  };

  return (
    <div className="py-4 w-full max-w-[1370px] flex items-center justify-between">
      <ul className="flex items-center space-x-4 font-semibold">
        {stats.map((stat) => (
          <li className="flex space-x-2" key={stat.id}>
            <p className="capitalize">{stat.name}:</p>
            {isFetching ? (
              <span className="w-12 animate-skeleton" />
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
        <p className="font-bold">USD</p>
        {/* <button
          className="hover:scale-125 transition-all focus:scale-95 w-6 dark:text-neutral-300"
          onClick={toggleDarkMode}
        >
          {localStorage.theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button> */}
        <Switch
          checked={darkMode}
          onChange={toggleDarkMode}
          className="dark:bg-neutral-800 bg-slate-200 relative inline-flex h-8 w-14 items-center rounded-full shadow-inner transition-colors group"
        >
          <span className="sr-only">Enable dark mode</span>
          <span
            className={`${
              darkMode === "dark"
                ? "group-hover:translate-x-5 translate-x-6"
                : "group-hover:translate-x-2 translate-x-1"
            } transition`}
          >
            {localStorage.theme === "dark" ? (
              <MoonIcon className="inline-block h-7 w-7 transform rounded-full bg-neutral-700 text-slate-100 p-1 transition group-hover:bg-neutral-600" />
            ) : (
              <SunIcon className="inline-block h-7 w-7 transform rounded-full bg-slate-50 p-0.5 transition group-hover:bg-slate-100" />
            )}
          </span>
          <span />
        </Switch>
      </div>
    </div>
  );
}

export default Header;
