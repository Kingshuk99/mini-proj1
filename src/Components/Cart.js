import React, { useState, useEffect, useContext } from "react";
import { SessionInfoContext } from "../App";
import { createPortal }  from 'react-dom';
import Popup from './Popup';

const Cart = () => {
    const [cart, setCart] = useState({});  //jst for a single crt
    const [orders, setOrders] = useState([]);
    const [showPopup , setShowPopup] = useState(false);
    const sessionInfo = useContext(SessionInfoContext).sessionInfo; //consuming the context 

    useEffect(() => {
        const fetchCart = async (sessionInfo) => {
            if(!sessionInfo) {
                return;
            }
            const response = await fetch(`http://localhost:3030/cart/${sessionInfo.id}`);
            const result = await response.json();
            setCart(result);
        }
        fetchCart(sessionInfo);
    }, [sessionInfo])

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(`http://localhost:3030/order`);
            const result = await response.json();
            setOrders(result);
        }
        fetchOrders();
    }, [])    //[] it will rerender the page when there is any change in data.

    const addMore = async(itemName, itemId) => {
        const newCart = {...cart};
        const newItem = cart[itemName].filter(item => item.id===itemId)[0];
        newItem.count = newItem.count+1;
        newCart.total += newItem.price;
        const response = await fetch(`http://localhost:3030/cart/${sessionInfo.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCart)
        });
        const result = await response.json();
        setCart(result);
    }

    const reduce = async(itemName, itemId) => {
        const newCart = {...cart};
        const newItem = cart[itemName].filter(item => item.id===itemId)[0];
        newItem.count = newItem.count-1;
        newCart.total -= newItem.price;
        const response = await fetch(`http://localhost:3030/cart/${sessionInfo.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCart)
        });
        const result = await response.json();
        setCart(result);
    }

    const payAndOrder = async() => {
        const deleteCart = async() => {
            const newCart = {id: cart.id};
            const response = await fetch(`http://localhost:3030/cart/${sessionInfo.id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
            body: JSON.stringify(newCart)
            });
            const result = await response.json();
            setCart(result);
            setShowPopup(true);
        }
        const maxId = orders.length > 0 ? Math.max(...orders.map(order=>order.id)):0;
        const newOrder = {...cart};
        newOrder.id = JSON.stringify(maxId+1);
        newOrder.userId = cart.id;
        newOrder.status = "Order placed!";

        const response = await fetch(`http://localhost:3030/order`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        });
        const result = await response.json();
        setOrders(result);
        deleteCart();
    }

  return (
    <>
      <h1>Your cart!</h1>
      <ul>
        {
            Object.keys(cart).filter(k => k!=='id' && k!=='total').map((val, i) => (
                <li className= "cartItems" key={i}>
                    <h2>{val}: </h2>
                    {
                        cart[val].map(obj => ((obj.count!==0) &&
                            (<>
                            <h6>- {obj.name} - {obj.count} items</h6>
                            <button className="btn btn-primary"  type='button' 
                            onClick={()=>addMore(val, obj.id)}>Add More</button>
                            <button className="btn btn-danger"  type='button' 
                            onClick={()=>reduce(val, obj.id)}>Reduce</button>
                            </>)
                        ))
                    }
                </li>
            ))
        }
      </ul>
      <br/>
      {(cart.total!==0) && 
      <>
      <h2>Total: {cart.total}</h2>
      <button className="btn btn-primary"  type='button' onClick={()=>payAndOrder()}>Pay and order</button>
      </>}
      {
        cart.total===0 && 
        (<h2>Empty!</h2>)
      }
      {showPopup && createPortal(<Popup  onClose={()=>setShowPopup(false)}/>,
        document.body)}
    </>
  )
};

export default Cart;
