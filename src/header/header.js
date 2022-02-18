import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./index.css"
const Header = () =>{
    const [hasuser,setHasuser] = useState(false);
    const [user,setUser] = useState("");
    const navigate = useNavigate()
    const logout = () =>{
        sessionStorage.clear()
        navigate("/login")
    }
    useEffect(()=>{
        let user = sessionStorage.getItem("user")
        if(user!==null){
            setHasuser(true)
            user = JSON.parse(user)
            setUser(user.userid)

        }
    })
    return(
        <div className="bg-light header-container">
            <div className="navbar-brand">
                <h4>Price Tracker</h4>
            </div>
            {hasuser?<div className="logout-btn">
               {user} <button className="btn btn-sm btn-outline-secondary" onClick={logout}>  <i className="bi bi-power"></i> Logout</button>
            </div>:""}
        </div>
    )
}

export default Header