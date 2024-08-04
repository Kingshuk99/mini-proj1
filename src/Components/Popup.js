import React from "react";
import "./style.css"

const Popup = ({onClose}) => {
    return (
        <div className='modal'>
            <div>Order placed!</div>
            <button onClick={onClose}>Close</button>
        </div>
      )
};

export default Popup;
