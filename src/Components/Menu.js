import React from "react"
import { Link, Route, Routes } from 'react-router-dom';
import ItemList from "./ItemList";
const Menu = () => {
  return (

    <>
      <div className="container text-center">
            <div className="card">
            <Link to={`/menu/pizza`}>
                <button  className="btn btn-primary" type='button'>Pizza</button>
            </Link>
            <span> </span>
            </div>
            <div className="card">
            <Link to={`/menu/burger`}>
                <button  className="btn btn-primary" type='button'>Burger</button>
            </Link>
            <span> </span>
            </div>
            <div className="card">
            <Link to={`/menu/combo`}>
                <button  className="btn btn-primary" type='button'>Combo</button>
            </Link>
            <span> </span>
            </div>
            
            <div className="card">
            <Link to={`/menu/beverage`}>
                <button  className="btn btn-primary" type='button'>Beverages</button>
            </Link>
            <span> </span>
            </div>
        </div>
        <Routes>
            <Route path = "/pizza/*" element = {<ItemList itemName={"pizza"}/>}/>
            <Route path = "/burger/*" element = {<ItemList itemName={"burger"}/>}/>
            <Route path = "/combo/*" element = {<ItemList itemName={"combo"}/>}/>
            <Route path = "/beverage/*" element = {<ItemList itemName={"beverage"}/>}/>
        </Routes>
    </>
  )
};

export default Menu;
