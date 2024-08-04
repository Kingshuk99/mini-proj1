import React from "react"

import { useParams} from 'react-router-dom'
import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ItemDetails = ({itemName}) => {
    const {id} = useParams();
    const [item, setItem] = useState({});

    useEffect(() => {
        const fetchItem = async () => {
            const response = await fetch(`${backendUrl}/${itemName}/${id}`);
            const result = await response.json();
            setItem(result);
        };
        fetchItem();
    }, [itemName, id])
  return (
    <>
      <div className="card"  style={{"width": "50rem"}} key = {item.id}>
            <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <img src={item.image} className="card-img-top" alt={item.name}/>
            <p className="card-text">{item.desc}</p>
            <h6 className="card-text">Price- Rs {item.price} only</h6>
            <Link to = {`/menu/${itemName}`}>
            <button className="btn btn-primary" type='button'>Go Back</button>
            </Link>
            </div>
        </div>
    </>
  )
};

export default ItemDetails;
