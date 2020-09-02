import React,{useEffect} from "react";
import { BrowserRouter as Router, Route, Switch ,Link} from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ReactGA from 'react-ga';
import { CartProvider } from "./Context/CartProvider";
function App() {
  useEffect(() => {
    ReactGA.initialize('UA-174246969-1');
    ReactGA.pageview(window.location.pathname);
  }, [])
  return (
    <div className="app">
    <Router>
      <Header />
        <Switch>
          <Route  path="/login"  component={Login}></Route>
          <Route  path="/register"  component={Register}></Route>
          <Route  path="/home"  component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
