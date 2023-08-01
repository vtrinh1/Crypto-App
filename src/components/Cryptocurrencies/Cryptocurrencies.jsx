import React, { Fragment, useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../../services/cryptoApi";
import Loader from "../Loader";
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
  ];

  const [selectedOrderByKey, setSelectedOrderByKey] = useState(orderByKeys[0]);
  const [selectedLimit, setSelectedLimit] = useState(limits[2]);
  const count = simplified ? 10 : 500;
  const { data: cryptosList, isFetching } = useGetCryptosQuery({
    selectedLimit,
    selectedOrderByKey,
  });
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <div className="flex flex-col mt-6">
      <div className="flex font-bold text-3xl items-center mb-4">
        <div className="mr-4">Today's Top Cryptocurrency by</div>
        <Listbox value={selectedOrderByKey} onChange={setSelectedOrderByKey}>
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
        <Input
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
      <div className="flex px-2 font-bold text-lg py-4 border-slate-500 border-opacity-10 border-t-2">
        <p className="w-8">#</p>
        <p className="w-1/5">Name</p>
        <p className="w-1/12 text-right">Price</p>
        <p className="w-1/12 text-right">24h %</p>
        <p className="flex justify-end items-center w-1/6">
          Market Cap
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
        </p>
        <p className="flex justify-end items-center w-1/6">
          Volume(24)
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
        </p>
      </div>
      <div className="flex flex-col">
        {cryptos?.map((currency, index) => (
          <Link
            to={`/crypto/${currency.uuid}`}
            key={currency.uuid}
            className={`flex items-center px-2 py-4 border-slate-500 border-opacity-10 border-b-2 hover:bg-slate-500 hover:bg-opacity-10 hover:text-textDark font-semibold text-base ${
              index === 0 && "border-t-2"
            }`}
          >
            <p className="w-8">{index + 1}</p>
            <div className="flex items-center w-1/5 space-x-2 pr-2">
              <img
                className="h-8 w-8"
                src={currency.iconUrl}
                alt={`${currency.name} Icon`}
              />
              <p>{currency.name}</p>
              <p className="text-textGray text-sm">{currency.symbol}</p>
            </div>
            <NumericFormat
              className="w-1/12 text-right"
              value={currency.price}
              prefix={"$"}
              thousandSeparator=","
              decimalScale={2}
              displayType="text"
            />
            {currency.change < 0 ? (
              <p className={`${styles.change__text} text-red-600`}>
                <span className="w-0 h-0 border-l-[5px] border-l-transparent border-t-[8px] border-t-red-600 border-r-[5px] border-r-transparent" />
                <NumericFormat
                  value={currency.change * -1}
                  suffix={"%"}
                  thousandSeparator=","
                  decimalScale={2}
                  displayType="text"
                />
              </p>
            ) : currency.change > 0 ? (
              <p className={`${styles.change__text}  text-green-600`}>
                <span className="w-0 h-0 border-l-[5px] border-l-transparent border-b-[8px] border-b-green-600 border-r-[5px] border-r-transparent" />
                <NumericFormat
                  value={currency.change}
                  suffix={"%"}
                  thousandSeparator=","
                  decimalScale={2}
                  displayType="text"
                />
              </p>
            ) : (
              <p className={styles.change__text}>
                <NumericFormat
                  value={currency.change}
                  suffix={"%"}
                  thousandSeparator=","
                  decimalScale={2}
                  displayType="text"
                />
              </p>
            )}

            <NumericFormat
              className="w-1/6 text-right"
              value={currency.marketCap}
              prefix={"$"}
              thousandSeparator=","
              decimalScale={2}
              displayType="text"
            />
            <NumericFormat
              className="w-1/6 text-right"
              value={currency["24hVolume"]}
              prefix={"$"}
              thousandSeparator=","
              decimalScale={2}
              displayType="text"
            />
          </Link>
        ))}
      </div>
      {/* {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={8}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="crypto icon"
                  />
                }
                hoverable
              >
                <p></p>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row> */}
    </div>
  );
}

export default Cryptocurrencies;
