import './App.css';
import React, { useEffect, useState, createContext } from "react";
import Navbar from './Components/Navbar';
import { BrowserRouter } from 'react-router-dom';
export const SessionInfoContext = createContext();
function App() {
  const [sessionInfo, setSessionInfo] = useState(JSON.parse(localStorage.getItem('sessionInfo')));

  useEffect(() => {
    localStorage.setItem('sessionInfo', JSON.stringify(sessionInfo));
  }, [sessionInfo])

  return (
    <>
    <BrowserRouter>
    <SessionInfoContext.Provider value={{sessionInfo, setSessionInfo}}>
      <Navbar/>
    </SessionInfoContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
