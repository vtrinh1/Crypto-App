import React from "react";
import { Link } from "react-router-dom";
import Logo from "assets/images/logo.png";

function Footer() {
  const menuItems = ["home", "cryptocurrencies", "news"];

  return (
    <footer class="w-full py-24 bg-white dark:bg-neutral-800">
      <div class="text-center flex items-center flex-col">
        <Link
          className="flex items-center text-2xl font-semibold hover:text-textDark"
          to="/"
        >
          <img src={Logo} alt="logo" className="h-8 mr-2" />
          CryptoHub
        </Link>
        <p class="my-6 text-gray-500 dark:text-gray-400">
          Explore the latest updates, discover trends, and make informed
          decisions in the dynamic world of cryptocurrencies powered by
          real-time data.
        </p>
        <ul class="flex flex-wrap justify-center items-center mb-6 font-semibold">
          {menuItems.map((item) => (
            <Link
              to={`/${item === "home" ? "" : item}`}
              className="flex items-center capitalize px-6 h-full hover:text-accent dark:hover:text-accent"
              key={item}
            >
              {item}
            </Link>
          ))}
        </ul>
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023-{new Date().getFullYear()}{" "}
          <a
            href="https://www.vincent-trinh.com/"
            target="_blank"
            rel="noreferrer"
            class="hover:underline"
          >
            Vincent Trinh
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
