import React, {useContext} from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Home";
import Menu from "./Menu";
import Contact from "./Contact";
import Login from "./Login";
import Register from "./Register";
import { SessionInfoContext } from "../App";
import Cart from "./Cart";
import Orders from "./Orders";
import Revenue from "./Revenue";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const {sessionInfo, setSessionInfo} = useContext(SessionInfoContext);
  const navigate = useNavigate();

  const logOut = () => {
    setSessionInfo(null);
    navigate(`/`);
  }


  return(
    <>
   
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Pizzeria</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          {(sessionInfo!==null) &&
          (<li className="nav-item">
            <a className="nav-link" href="/menu">Menu</a>
          </li>)}
          <li className="nav-item">
            <a className="nav-link" href="/contact">Contact Us</a>
          </li>
          {
            (sessionInfo!==null && sessionInfo.role==='user') && 
            (
              <li className="nav-item">
              <a className="nav-link" href="/cart">Cart</a>
              </li>
            )
          }
          {
            (sessionInfo!==null) && 
            (
              <li className="nav-item">
              <a className="nav-link" href="/order">Orders</a>
              </li>
            )
          }
          {
            (sessionInfo!==null && sessionInfo.role==='admin') && 
            (
              <li className="nav-item">
              <a className="nav-link" href="/revenue">Revenue</a>
              </li>
            )
          }
          {
          (sessionInfo===null) &&
          (<li>
          <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Login/Register
            </a>

            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="/login">Login</a></li>
              <li><a className="dropdown-item" href="/register">Register</a></li>
            </ul>
          </div>
          </li>)}
          {
            (sessionInfo!==null) && 
            (
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-danger" type="button" onClick={logOut}>Logout</button>
              </div>
            )
          }
        </ul>
      </div>
    </div>
  </nav>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/menu/*" element={<Menu/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/order" element={<Orders/>}/>
    <Route path="/revenue" element={<Revenue/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
  </Routes>
 
  </>
  )
}

export default Navbar;