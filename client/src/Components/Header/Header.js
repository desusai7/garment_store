import React  from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "./Header.css";
import {useUser,useUserUpdate } from "E:/Weekend Projects/garment-store/client/src/Context/UserProvider";
function Header() {
  const history = useHistory();
  const user = useUser();
  const updateUser = useUserUpdate();
  const logout = async() =>
  {
    Axios({
      method: "GET",
      url: "http://localhost:5000/logout",
      withCredentials: true,
    }).then((res) => {
      alert(res.data.message);
      updateUser(null);
    });
  }


  
  return (
    <div className="header">
      <h1 className="header__brand" onClick={()=>history.push("/home")}>Garment'Store</h1>
      <div className="header__logincontainer">
      {user ? 
      (
      <button onClick={logout}>Logout</button>
      ) : 
      (<>
      <button className="header__button" onClick={()=>history.push("/login")} >Login</button>
      <button className="header__button" onClick={()=>history.push("/register")}>Signup</button>
      </>
      )
      }
      </div>     
    </div>
);
}

export default Header;
