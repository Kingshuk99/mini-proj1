import React, { useState, useEffect } from "react"

const Revenue = () => {
    const [orders, setOrders] = useState([]);
    const [revenue, setRevenue] = useState(0);
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(`http://localhost:3030/order`);
            const result = await response.json();
            setOrders(result);
            var tot = 0;
            for(let i=0; i<orders.length; i++) {
                tot += orders[i].total;
            }
            setRevenue(tot);
        }
        fetchOrders();
    }, [orders])  //if orders change then only it rerenders 

  return (
    <>
      <h2>Revenue: Rs {revenue}</h2>
    </>
  )
};

export default Revenue;
