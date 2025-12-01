import React,{useState,useEffect} from "react";
import axios from "axios"

import { positions } from "../data/data";
const Positions = () => {
  const [allPosition,setallPosition] = useState([]);
  useEffect(()=>{
axios.get("http://localhost:3001/allPosition").then((res)=>{
  setallPosition(res.data)
})
  },[])
  return (
    <>
      <h3 className="title">Position</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

  {allPosition.map((stocks,index)=>{
      const currValue  =  stocks.price * stocks.qty
      const isProfit = currValue -stocks.avg * stocks.qty >= 0.0
      const profClass = isProfit ? "profit" : "loss"
      const dayClass = stocks.isLoss ?"loss" :"profit"
      return (
          
    <tr key={index} >
    
    <td>{stocks.product}</td>
    <td>{stocks.name}</td>
    <td>{stocks.qty}</td>
    <td>{stocks.avg.toFixed(2)}</td>
    <td>{stocks.price.toFixed(2)}</td>
    <td className={profClass}>{(currValue-stocks.avg * stocks.qty).toFixed(2)}</td>
    
    <td className={dayClass}>{stocks.day}</td>
    </tr>
      )
    })}

        
        </table>
      </div>
    </>
  );
};

export default Positions;