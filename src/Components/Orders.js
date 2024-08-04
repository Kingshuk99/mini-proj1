import React, { useState, useEffect, useContext } from "react";
import { SessionInfoContext } from "../App";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const sessionInfo = useContext(SessionInfoContext).sessionInfo;

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(`${backendUrl}/order`);
            const result = await response.json();
            setOrders(result);
        }
        fetchOrders();
    }, [])  //[] if  there is any change in data it will be rerendered 

    const acceptOrder = async(id) => {
        const acceptedOrder = {...orders.filter(order => order.id===id)[0]};
        acceptedOrder.status = "Order Accepted!";
        const response = await fetch(`${backendUrl}/order/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(acceptedOrder)
        });
        const result = await response.json();
        const otherOrders = orders.filter(order => order.id!==id);  
        setOrders([...otherOrders, result]);
    }

  return (
    <>
      <h1>Orders: </h1>
      <div>
      {
        orders.map((order, i) => (
            <div key = {i}>
            {(sessionInfo!==null && ((sessionInfo.role==='admin' && order.status==="Order placed!") || 
            (sessionInfo.role==='user' && order.userId===sessionInfo.id))) &&
                (
                <h6>Order id: {order.id} ---- Status: {order.status} ---- Total: Rs {order.total}</h6>)}
            {
                (sessionInfo!=null && sessionInfo.role==='admin' && order.status==='Order placed!') && 
                (
                    <button className="btn btn-primary"  type='button' 
            onClick={()=>acceptOrder(order.id)}>Accept</button>
                )
            }
        </div>
        ))
      }
      </div>
    </>
  )
};

export default Orders;
