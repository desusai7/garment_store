import React, { useState, useEffect } from "react";
import "./Register.css";
import { useHistory, Link ,Redirect} from "react-router-dom";
import Axios from "axios";
function Register() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const signup = async (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: username,
        email: email,
        password: password,
        password2: password2,
      },
      url: "http://localhost:5000/register",
    }).then((res) => {
      if (res.data.message === "success") {
        alert("Sucessfully Registered ! Redirecting to Login Page");
        history.push("/login");
      } else {
        setErrors(res.data);
      }
    });
  };

  const getUser = async () => {
    Axios({
      method: "GET",
      url: "http://localhost:5000/user",
      withCredentials: true,
    }).then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="register">
      {user?.username && <Redirect to="/"></Redirect>}
      <div className="register__errors">
        <ul>
          {errors?.map((error, index) => (
            <li key={index}>{error.message}</li>
          ))}
        </ul>
      </div>
      <div className="register__body">
        <form onSubmit={signup} method="post">
          <div className="register__heading">
            <center>
              {" "}
              <h1>Register Here! </h1>
            </center>
          </div>
          <span>
            <b>Enter Your Username Here</b>
          </span>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span>
            <b>Enter Your Mail Address Here</b>
          </span>
          <input
            type="text"
            placeholder="Enter Mail Address"
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
          <span>
            <b>Enter Your Password Again</b>
          </span>
          <input
            type="password"
            placeholder="Enter Your Password Again"
            name="psw2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <button className="button" type="submit">Register</button>
          Already Registered ? <Link to="/login"> Login Here</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
