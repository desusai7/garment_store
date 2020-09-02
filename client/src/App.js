import React,{useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ReactGA from 'react-ga';
import {CartProvider}  from "./Context/CartProvider";
import {UserProvider}  from "./Context/UserProvider";
function App() {
  useEffect(() => {
    ReactGA.initialize('UA-174246969-1');
    ReactGA.pageview(window.location.pathname);
  }, [])
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
