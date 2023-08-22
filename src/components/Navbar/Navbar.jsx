import React from "react";
import { Link } from "react-router-dom";
import Logo from "assets/images/logo.png";
import Header from "./Header";

function Navbar() {
  const menuItems = ["home", "cryptocurrencies", "news"];
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <div className="w-full h-px bg-slate-500 bg-opacity-10" />
      <div className="w-full max-w-[1370px] flex items-center justify-between h-16">
        <div className="flex items-center space-x-12 h-full">
          <Link
            className="flex items-center text-2xl font-semibold hover:text-textDark"
            to="/"
          >
            <img src={Logo} alt="logo" className="h-8 mr-2" />
            CryptoHub
          </Link>
          <div className="flex text-xl font-semibold decoration-none h-full">
            {menuItems.map((item) => (
              <Link
                to={`/${item === "home" ? "" : item}`}
                className="flex items-center capitalize px-6 h-full hover:text-accent dark:hover:text-accent"
                key={item}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex space-x-10 text-xl">
          <p>watchlist</p>
          <p>search</p>
        </div>
      </div>
      <div className="w-full h-px bg-slate-500 bg-opacity-10" />
    </div>
  );
}

export default Navbar;
