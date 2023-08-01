import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
// import { Navbar, Exchanges, Home, Cryptocurrencies, News, CryptoDetails } from './components'
import { Navbar, Cryptocurrencies, News, CryptoDetails } from "./components";
import Home from "./components/Home/Home.jsx";
import "./App.css";

function App() {
  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-[1370px]">
        <div className="routes">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <Route exact path="/exchanges">
                <Exchanges />
              </Route> */}
            <Route exact path="/cryptocurrencies">
              <Cryptocurrencies />
            </Route>
            <Route exact path="/crypto/:coinId">
              <CryptoDetails />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
          </Switch>
        </div>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryptohub <br />
            &copy; {new Date().getFullYear()} Vincent Trinh
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            {/* <Link to="/exchanges">Exchanges</Link> */}
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
