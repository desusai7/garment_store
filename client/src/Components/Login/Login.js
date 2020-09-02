import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useHistory, Redirect } from "react-router-dom";
import Axios from "axios";
import { useUser,useUserUpdate } from "E:/Weekend Projects/garment-store/client/src/Context/UserProvider";
function Login() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateUser = useUserUpdate();
  const user = useUser();

  const login = async (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        email: email,
        password: password,
      },
      url: "http://localhost:5000/login",
      withCredentials: true,
    }).then((res) => {
      if (res.data.user_id != null && res.data.email != null) {
        updateUser(res.data);
        alert("Login Successful ! Taking you to Home Page");
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
      console.log(user);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  
  return (
    <div className="login">
      {user?.username && <Redirect to="/home"></Redirect>}

      <div className="login__errors">
        <ul>{error && <li>{error.message}</li>}</ul>
      </div>
      <div className="login__body">
        <form onSubmit={login} method="post">
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
        </form>
      </div>
    </div>
  );
}

export default Login;
