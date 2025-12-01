import React, { useState, useContext } from "react";
import { Tooltip, Grow } from "@mui/material";
import { watchlist } from "../data/data";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  SportsGymnastics,
} from "@mui/icons-material";
import GeneralContext from "./GeneralContext";



import { DoughNutChart } from "./DoughNutChart";
const labels = watchlist.map((subArray) => subArray["name"]);

function WatchList() {


    const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="watchlist-container">
        <div className="search-container">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
            className="search"
          />
          <span className="counts"> {watchlist.length}</span>
        </div>

        <ul className="list">
          {watchlist.map((stocks, index) => {
            return <WatchListItem stocks={stocks} key={index} />;
          })}
        </ul>
          <DoughNutChart data={data} />
      </div>
    </>
  );
}

export default WatchList;
const WatchListItem = ({ stocks }) => {
  const [showWatchListActions, setShowWatchListActios] = useState(false);
  const handleMouseEnter = (e) => {
    setShowWatchListActios(true);
  };
  const handleMouseexit = (e) => {
    setShowWatchListActios(false);
  };
  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseexit}>
      <div className="item">
        <p className={stocks.isDown ? "down" : "up"}>{stocks.name}</p>
        <div className="itemInfo">
          <span className="percent">{stocks.percent}</span>
          {stocks.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="percent">{stocks.price}</span>
        </div>
      </div>
      {showWatchListActions && <WatchListActions uid={stocks.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const ctx = useContext(GeneralContext);

  const handleBuy = () => {
    if (ctx && typeof ctx.openBuyWindow === "function") ctx.openBuyWindow(uid);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="buy" onClick={handleBuy}>Buy</button>
        </Tooltip>
          <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell">Sell</button>
        </Tooltip>
          <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined/>
          </button>
        </Tooltip>
          <Tooltip
          title="More"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
         <button className="action">
            <MoreHoriz/>
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
