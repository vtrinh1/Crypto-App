import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { NumericFormat } from "react-number-format";
import styles from "./Cryptocurrencies.module.css";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

function Cryptocurrencies({ simplified }) {
  const orderByKeys = [
    { id: 1, key: "marketCap", name: "Market Cap" },
    { id: 2, key: "price", name: "Price" },
    { id: 3, key: "24hVolume", name: "24h Volume" },
    { id: 4, key: "change", name: "Change" },
  ];

  const limits = [
    { id: 1, key: "500" },
    { id: 2, key: "200" },
    { id: 3, key: "100" },
    { id: 4, key: "50" },
    { id: 5, key: "20" },
    { id: 6, key: "10" },
  ];

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

      setCryptos(sortedData.slice(0, selectedLimit.key));
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
    <section className="flex flex-col mt-6">
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
                    "w-60 py-2 pl-4 pr-2 rounded-xl flex items-center justify-between bg-slate-400 bg-opacity-10 ring-1 ring-black ring-opacity-5"
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
          <div className="w-full mb-4 flex items-center justify-between font-semibold text-slate-500">
            <input
              className="ring-2 ring-slate-500 ring-opacity-10 rounded-lg px-4 py-2 focus:outline-0 focus:placeholder-text-black transition-all duration-100"
              placeholder="Search Cryptocurrency"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex items-center">
              <div className="mr-2">Show rows</div>
              <Listbox value={selectedLimit} onChange={setSelectedLimit}>
                <div className="relative">
                  <Listbox.Button
                    className={
                      "w-16 py-1 pl-2 pr-1 rounded-xl flex items-center justify-between bg-slate-400 bg-opacity-10 ring-1 ring-black ring-opacity-5"
                    }
                  >
                    {selectedLimit.key}
                    <span className="flex items-center">
                      <ChevronUpDownIcon className="h-5" aria-hidden="true" />
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
                    <Listbox.Options className="absolute mt-2 w-full rounded-xl bg-white  font-semibold shadow-lg ring-1 ring-black ring-opacity-5 p-1">
                      {limits.map((limit) => (
                        <Listbox.Option
                          key={limit.id}
                          className="flex items-center justify-between relative cursor-pointer select-none py-1.5 px-1.5 rounded-xl hover:bg-slate-400 hover:bg-opacity-10"
                          value={limit}
                        >
                          {limit.key}
                          {selectedLimit.id === limit.id && (
                            <CheckIcon className="h-3" />
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
                class={`${styles.heading__tooltip} group-hover:opacity-100 group-hover:visible`}
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
                class={`${styles.heading__tooltip} group-hover:opacity-100 group-hover:visible`}
              >
                A measure of how much of a cryptocurrency was traded in the last
                24 hours.
              </span>
            </div>
          </div>
        </li>
      </ul>
      <div className="flex flex-col">
        {!isFetching
          ? cryptos.map((coin) => (
              <Link
                to={`/crypto/${coin.uuid}`}
                key={coin.uuid}
                className="flex items-center px-2 py-4 border-slate-500 border-opacity-10 border-b-2 hover:bg-slate-500 hover:bg-opacity-10 hover:text-textDark font-semibold text-base duration-100"
              >
                <p className="w-14">{coin.rank}</p>
                <div className="flex items-center w-1/5 space-x-2 pr-2">
                  <img
                    className="h-8 w-8"
                    src={coin.iconUrl}
                    alt={`${coin.name} Icon`}
                  />
                  <p className="truncate">{coin.name}</p>
                  <p className="text-textGray text-sm">{coin.symbol}</p>
                </div>
                {coin.price < 0.0000001 ? (
                  <div className="w-1/12 flex justify-end">
                    <div className="w-min group relative">
                      $0.0...
                      {String(parseInt(coin.price * 100000000000)).padStart(
                        4,
                        "0"
                      )}
                      <span class="w-min text-base bg-white font-semibold invisible transition-all duration-200 ease-in-out opacity-0 absolute p-4 ring-1 ring-slate-500 ring-opacity-10 rounded-xl shadow-lg group-hover:opacity-100 -bottom-16 -right-1/2 group-hover:visible z-10">
                        $
                        {parseFloat(coin.price)
                          .toFixed(20)
                          .substring(
                            0,
                            parseFloat(coin.price).toFixed(20).indexOf(".") + 12
                          )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <NumericFormat
                    className="w-1/12 text-right"
                    value={parseFloat(coin.price)}
                    prefix={"$"}
                    thousandSeparator=","
                    decimalScale={
                      parseFloat(coin.price) < 0.000001
                        ? 8
                        : parseFloat(coin.price) < 0.00001
                        ? 7
                        : parseFloat(coin.price) < 0.0001
                        ? 6
                        : parseFloat(coin.price) < 0.001
                        ? 5
                        : parseFloat(coin.price) < 0.001
                        ? 4
                        : parseFloat(coin.price) < 0.01
                        ? 4
                        : parseFloat(coin.price) < 0.1
                        ? 3
                        : 2
                    }
                    fixedDecimalScale={true}
                    displayType="text"
                  />
                )}
                {coin.change < 0 ? (
                  <p className={`${styles.change__text} text-red-600`}>
                    <span className="w-0 h-0 border-l-[5px] border-l-transparent border-t-[8px] border-t-red-600 border-r-[5px] border-r-transparent" />
                    <NumericFormat
                      value={coin.change * -1}
                      suffix={"%"}
                      thousandSeparator=","
                      decimalScale={2}
                      displayType="text"
                    />
                  </p>
                ) : coin.change > 0 ? (
                  <p className={`${styles.change__text}  text-green-600`}>
                    <span className="w-0 h-0 border-l-[5px] border-l-transparent border-b-[8px] border-b-green-600 border-r-[5px] border-r-transparent" />
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
                      value={coin.change}
                      suffix={"%"}
                      thousandSeparator=","
                      decimalScale={2}
                      displayType="text"
                    />
                  </p>
                )}

                <NumericFormat
                  className="w-1/6 text-right"
                  value={coin.marketCap}
                  prefix={"$"}
                  thousandSeparator=","
                  decimalScale={2}
                  displayType="text"
                />
                <NumericFormat
                  className="w-1/6 text-right"
                  value={coin["24hVolume"]}
                  prefix={"$"}
                  thousandSeparator=","
                  decimalScale={2}
                  displayType="text"
                />
              </Link>
            ))
          : new Array(20).fill(0).map((_, index) => (
              <div
                key={index}
                className="animate-pulse pr-2 py-4 border-slate-500 border-opacity-10 border-b-2 w-full flex"
              >
                <div className="h-8 w-14 flex mr-2 pr-4">
                  <span className={`${styles.coin__skeleton}`} />
                </div>
                <div className="w-1/5 flex pr-8">
                  <span className={styles.coin__skeleton} />
                </div>
                <div className="w-1/12 flex pl-8">
                  <span className={styles.coin__skeleton} />
                </div>
                <div className="w-1/12 flex pl-8">
                  <span className={styles.coin__skeleton} />
                </div>
                <div className="w-1/6 flex pl-16">
                  <span className={styles.coin__skeleton} />
                </div>
                <div className="w-1/6 flex pl-16">
                  <span className={styles.coin__skeleton} />
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}

export default Cryptocurrencies;
