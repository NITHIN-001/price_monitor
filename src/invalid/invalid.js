import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Invalid = () => {
    const [hasuser,sethasuser] = useState(false);
    useEffect(()=>{
        var user = sessionStorage.getItem("user")
        if(user!==null){
            sethasuser(true)
        }
    })
    return(
        <div className="container">
            <h4>Invalid Route</h4>
            {hasuser?<Link to="/">Go back to Home</Link>:""}
        </div>
    )
}

export default Invalid;