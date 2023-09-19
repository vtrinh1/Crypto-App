import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import {
  Navbar,
  Cryptocurrencies,
  News,
  CryptoDetails,
  Cryptocurrency,
} from "./components";
import Home from "./components/Home/Home.jsx";
import "./App.css";
import Footer from "components/Footer";

function App() {

  useEffect(() => {
    // System preference dark mode
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 transition-colors w-full flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-[1370px]">
        <div className="routes">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/cryptocurrencies">
              <Cryptocurrencies />
            </Route>
            <Route exact path="/crypto/:coinId">
              <CryptoDetails />
              <Cryptocurrency />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
