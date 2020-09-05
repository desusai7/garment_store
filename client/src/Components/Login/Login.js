import "./Login.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import Axios from "axios";
import Alert from 'react-bootstrap/Alert'
import {useUser,useUserUpdate,} from "../UserProvider";
function Login() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateUser = useUserUpdate();
  const user = useUser();

  const login = async (loginType,event) => {
    event.preventDefault()
    Axios({
      method: "POST",
      data: {
        email: email,
        password: password,
      },
      url: `http://localhost:5000/login/${loginType}`,
      withCredentials: true,
    }).then((res) => {
      if (res.data.user_id != null && res.data.email != null) {
        updateUser(res.data);
        history.push("/home");
      } else {
        setError(res.data);
      }
    });
  };

  const getUser = async () => {
    Axios({
      method: "GET",
      url: "http://localhost:5000/user",
      withCredentials: true,
    }).then((res) => {
      updateUser(res.data);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="login">
      {user?.username && <Redirect to="/home"></Redirect>}

      <div className="login__errors">
      {error && 
        <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <ul>
          <li>{error.message}</li>
        </ul>
      </Alert>
        } 
          </div>

      <div className="login__body">
        <form onSubmit={(e)=>login("local",e)} >
          
          <div className="login__heading">
            <center>
              <h1>Login Here! </h1>
            </center>
          </div>

          <span>
            <b>Enter Your Mail Address Here</b>
          </span>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span>
            <b>Enter Your Password Here</b>
          </span>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit">
            Login
          </button>
          Not Registered ? <Link to="/register"> Register Here</Link>

          <div className="login__text">
            <center>
              <h6> (OR) </h6>
            </center>
          </div>

          <a href="http://localhost:5000/login/google">
          <button className="button" type="button">
            Sign in with Google
          </button>
          </a>
        </form>
      </div>
      
    </div>
  );
}

export default Login;
