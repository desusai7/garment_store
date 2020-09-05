import "./App.css";
import React,{useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ReactGA from 'react-ga';
import {CartProvider}  from "./Components/CartProvider";
import {UserProvider}  from "./Components/UserProvider";

function App() {
  
  //sending pageview to Google Analytics
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div className="app">
      <UserProvider>
      <CartProvider>
    <Router>
      <Header />
        <Switch>
          <Route  path="/login"> <Login /> </Route>
          <Route  path="/register"> <Register /> </Route>
          <Route  path="/home"  > <Home /> </Route>
        </Switch>
    </Router>
    </CartProvider>
    </UserProvider>
    </div>
  );
}

export default App;
