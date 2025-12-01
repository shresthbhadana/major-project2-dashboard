import React , { useState, useEffect } from 'react'
import { VerticalGraph } from './VerticalGraph';
import axios
 from "axios"
function Holdings() {
  const [allHoldings,setallHoldings] = useState([]);
  const label = allHoldings.map((subAarry=>subAarry.name))
  useEffect(()=>{
    axios.get("http://localhost:3001/allHoldings").then((res)=>{
      setallHoldings(res.data)
    })
  },[])
    const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderRdius:0,
        barPercetage : 0.9,
        categoryPercentage :0.8,
        barThickness : "flex",
      },
    ],
  };
    return ( 
    
 <>     
  <h3 className="title">Holdings ({allHoldings.length})</h3>
  <div className="order-table">
   
   <table>
    
    <tr>
    
    <th>Instrument</th>
    <th>Quantity</th>
    <th>Avg Cost</th>
    <th>LTP</th>
    <th>Curr valu</th>
    <th>P&L</th>
    <th>Net Charge</th>
    <th>Day Charge</th>
    </tr>

    {allHoldings.map((stocks,index)=>{
      const currValue  =  stocks.price * stocks.qty
      const isProfit = currValue -stocks.avg * stocks.qty >= 0.0
      const profClass = isProfit ? "profit" : "loss"
      const dayClass = stocks.isLoss ?"loss" :"profit"
      return (
          
  <tr key={index} >
    
  <td title={stocks.name}>{stocks.name}</td>
    <td>{stocks.qty}</td>
    <td>{stocks.avg.toFixed(2)}</td>
    <td>{stocks.price.toFixed(2)}</td>
    <td>{currValue.toFixed(2)}</td>
    <td className={profClass}>{(currValue-stocks.avg * stocks.qty).toFixed(2)}</td>
    <td className={profClass}>{stocks.net}</td>
    <td className={dayClass}>{stocks.day}</td>
    </tr>
      )
    })}
    </table>
  </div>

  <div className="row">
    <div className="col"> <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p></div>
  
   <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
       <VerticalGraph data={data} />
    </>

  );
    
}

export default Holdings;