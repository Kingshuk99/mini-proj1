import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Routes } from 'react-router-dom';
import { SessionInfoContext } from "../App";
import AddItem from './AddItem';
import ItemDetails from "./ItemDetails";

const ItemList = ({itemName}) => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState({});
    const sessionInfo = useContext(SessionInfoContext).sessionInfo;

    const deleteItem = async (id) => {
        fetch(`http://localhost:3030/${itemName}/${id}`, {
            method: 'DELETE'
        });
        setItems(items.filter(item => item.id!==id));
    }

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch(`http://localhost:3030/${itemName}`);
            const result = await response.json();
            setItems(result);
        }
        fetchItems();
    }, [itemName]);

    useEffect(() => {
        const fetchCart = async (id) => {
            const response = await fetch(`http://localhost:3030/cart/${sessionInfo.id}`);
            const result = await response.json();
            setCart(result);
        }
        fetchCart(sessionInfo.id);
    }, []);

    const addItem = async (itemData) => {
        const maxId = items.length > 0 ? Math.max(...items.map(item=>item.id)):0;
        const newItem = {...itemData, id: JSON.stringify(maxId+1)}
        const response = await fetch(`http://localhost:3030/${itemName}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newItem)
        });
        const result = await response.json();
        setItems([...items, result]);
    }

    const addToCart = async(itemId, itemType, itemPrice) => {
        const newCart = {...cart};
        if(!newCart.total) {   //if newCart.total is null 
            newCart.total = 0;
        }
        const itemCategory = cart[itemName];
        if(!itemCategory) {
            newCart[itemName] = [];
        }
        else {
            newCart[itemName] = itemCategory;
        }
        const itemList = newCart[itemName].filter(item => item.id===itemId);
        if(itemList.length===0) {
            newCart[itemName] = [...newCart[itemName], {id: itemId, name: itemType, price: itemPrice, count: 1}];
        }
        else {
            const item = itemList[0];
            const tempItems = newCart[itemName].filter(tempItem => tempItem.id!==item.id);
            newCart[itemName] = [...tempItems, {id: itemId, name: itemType, price: itemPrice, count: item.count+1}]
        }
        newCart.total = newCart.total+itemPrice;
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

  return (
    <>
      {
        (sessionInfo!=null && sessionInfo.role==='admin') && 
        (<>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <a className="btn btn-primary" href={`/menu/${itemName}/add-item`} role="button">Add new item</a>
        </div>
        <Routes>
        <Route path={`/add-item`} element={<AddItem item = {itemName} addItem={addItem}/>}/>
        </Routes>
        </>
        )
      }
      <Routes>
      <Route path = "/:id" element = {<ItemDetails itemName={itemName}/>}/>
      </Routes>
      <div className="container text-center">
        <ul>
            {
                items.map(item => (
                    <li className="card" key = {item.id}>
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.desc}</p>
                            <Link to={`/menu/${itemName}/${item.id}`}>
                                <button  className="btn btn-primary" type='button'>View More</button>
                            </Link>
                            <span> </span>
                            {(sessionInfo!=null && sessionInfo.role==='admin') &&
                                (<button className="btn btn-danger"  type='button' 
                            onClick={()=>deleteItem(item.id)}>Delete Item</button>)
                            }
                            {(sessionInfo!=null && sessionInfo.role==='user') &&
                                (<button className="btn btn-primary"  type='button' 
                            onClick={()=>addToCart(item.id, item.name, item.price)}>Add to cart</button>
                            )
                            }
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
    </>
  )
};

export default ItemList;
