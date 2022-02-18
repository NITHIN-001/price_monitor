import { useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import Header from "../header/header";
import Footer from "../footer/footer";
const Login = () =>{
    const [user,setUser] = useState("");
    const [hasUser,setHasUser] = useState(true);
    const [password,setPassword] = useState("");
    const [err,setErr] = useState(false);
    const[userEmpty,setuserEmpty] = useState(false);
    const[passEmpty,setpassEmpty] = useState(false);
    const [isloading,setisloading] = useState(false);
    const navigate = useNavigate();

    const toast = () =>{
        setHasUser(true);
        setErr(false);
        setpassEmpty(false);
        setuserEmpty(false);
    }

    const login = () =>{

        if(user.length===0){
            setuserEmpty(true)
            setTimeout(toast,3000)
            return
        }else if(password.length===0){
            setpassEmpty(true)
            setTimeout(toast,3000);
            return
        }
        setisloading(true);
        const userdata = {'user':user,"password":password}
        fetch('https://quiet-depths-68559.herokuapp.com/login',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(userdata)
        }).then((res)=>{
            return res.json()
        }).then(res=>{
            console.log(res)
            if(res.res!==""){
                sessionStorage.setItem("user",JSON.stringify(res.res))
                setUser("");
                setisloading(false)
                navigate("/")
            }else{
                setisloading(false)
                setHasUser(false);
                setTimeout(toast,5000);
            }
        }).catch(err=>{
            setisloading(false)
            console.log(err);
            setErr(true)
            setTimeout(toast,5000);
        })
        
    }
    return(
        <div>
            <Footer/>
            <Header/>
            <h5 style={{textAlign:"center"}}>Signin</h5>
            <div className="container">
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Username</span>
            <input type="text" className="form-control" onChange={(e)=>setUser(e.target.value)}/>
        </div>
        {userEmpty?<p style={{color:"red"}}>Username cannot be empty</p>:""}
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
            <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        {passEmpty?<p style={{color:"red"}}>Password cannot be empty</p>:""}
        {hasUser?"":<p style={{color:"red"}}>username or password incorrect</p>}
        {isloading?<div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>:""}
        <div className="btn-container">
            <div className="input-group mb-3">
            <button className="btn btn-primary" onClick={login}>Login</button>
        </div>
        <div className="input-group mb-3">
            <span>Don't have an account create one here &nbsp;</span>
            <Link to="/signup">  Signup</Link>
        </div>
        </div>
        {err?<p style={{color:"red"}}>Error Occured</p>:""}
        </div>
        
        </div>
    )
}

export default Login;