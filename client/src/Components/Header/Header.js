import React , {useState,useEffect} from "react";
import { useHistory,Link } from "react-router-dom";
import Axios from "axios";
import "./Header.css";
function Header() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  
  const logout = async() =>
  {
    Axios({
      method: "GET",
      url: "http://localhost:5000/logout",
      withCredentials: true,
    }).then((res) => {
      alert(res.data.message);
    });
    window.location="/home";
  }

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
