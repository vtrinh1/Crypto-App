import React from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import styles from "./CryptocurrencyCard.module.css";

function CryptoCard({ data, isFetching, selectedLimit }) {
  const decimalScaleCalculator = (value) => {
    let count = 2;
    while (value < 0.1) {
      value *= 10;
      count++;
    }
    return count;
  };

  return (
    <>
      {!isFetching
        ? data.map((coin) => (
            <Link
              to={`/crypto/${coin.uuid}`}
              key={coin.uuid}
              className="flex items-center px-2 py-4 border-slate-500 border-opacity-10 border-b-2 hover:bg-slate-500 hover:bg-opacity-10 hover:text-textDark font-semibold text-base transition-colors"
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
                    <span className="w-min text-base bg-white font-semibold invisible transition-all ease-in-out opacity-0 absolute p-4 ring-1 ring-slate-500 ring-opacity-10 rounded-xl shadow-lg group-hover:opacity-100 -bottom-16 -right-1/2 group-hover:visible z-10 dark:bg-neutral-800 dark:text-neutral-300">
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
                  decimalScale={decimalScaleCalculator(parseFloat(coin.price))}
                  fixedDecimalScale={true}
                  displayType="text"
                />
              )}
              {coin.change < 0.0 ? (
                <p
                  className={`${styles.change__text} text-red-600 dark:text-red-600`}
                >
                  <span className="w-0 h-0 border-l-[5px] border-l-transparent border-t-[8px] border-t-red-600 border-r-[5px] border-r-transparent" />
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
                    value={Math.abs(coin.change)}
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
        : new Array(selectedLimit).fill(0).map((_, index) => (
            <div
              key={index}
              className="animate-pulse pr-2 py-4 border-slate-500 border-opacity-10 border-b-2 w-full flex"
            >
              <div className="h-8 w-14 flex mr-2 pr-4">
                <span className={styles.coin__skeleton} />
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
    </>
  );
}

export default CryptoCard;
