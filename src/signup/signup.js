import { useState } from "react";
import {Link} from 'react-router-dom';
import Header from "../header/header";
import "./index.css";
import Footer from "../footer/footer";
const SignUp = () => {
    const [user,setUser] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isuserCreate,setIsUserCreated] = useState(false);
    const [err,setErr] = useState(false);
    const [userEmpty,setuserEmpty] = useState(false);
    const [userExsist,setUserExsist] = useState(false);
    const [emailEmpty,setemailEmpty] = useState(false);
    const[emailExsist,setemailExsist] = useState(false);
    const [passwordEmpty,setpasswordEmpty] = useState(false);
    const [validEmail,setvalidEmail] = useState(true);
    const toast = () =>{
        setuserEmpty(false);
        setemailEmpty(false);
        setUserExsist(false);
        setemailExsist(false);
        setpasswordEmpty(false);
        setvalidEmail(true);
        setErr(false);
    }


    const checkmail = () => {

        if(email.length>1){
                if (email.indexOf("@")>2 && email.indexOf(".")>email.indexOf("@")){
                    setvalidEmail(true)
                }else{
                    setvalidEmail(false);
                    setTimeout(toast,3000);
                    return
                }
            }
        
        fetch("https://quiet-depths-68559.herokuapp.com/mailcheck",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                
            },
            
            body:JSON.stringify({"email":email})
        }).then(res => {
            return res.json()
        }).then(res =>{
            if(res.res==="true"){
                setemailExsist(true);
                
            }else if(res.res==="error"){
                setErr(true);
                setTimeout(toast,5000);
            }else if(res.res==="false"){
                setemailExsist(false)
            }
        }).catch(err=>{
            console.log(err);
            setErr(true);
            setTimeout(toast,3000);
        })
    }


    const checkusername = () =>{
        if(user.length<6){
            setuserEmpty(true);
            setTimeout(toast,3000);
            return
        }

        fetch("https://quiet-depths-68559.herokuapp.com/usercheck",{
            method:"post",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({"user":user})
        }).then(res =>{
            return res.json();
        }).then(res =>{
            if(res.res==="true"){
                setUserExsist(true)
            }else if(res.res==="error"){
                setErr(true);
                setTimeout(toast,3000)
            }else if(res.res==="false"){
                setUserExsist(false)
            }
        })
    }


    const signup = () =>{
        
        if(user.length<6){
            setuserEmpty(true)
            setTimeout(toast,3000)
            return
        }else if(password.length<6){
            setpasswordEmpty(true)
            setTimeout(toast,3000);
            return
        }else if(email.length===0){
            setemailEmpty(true)
            setTimeout(toast,3000)
            return
        }else{
            if(email.length>1){
                if (email.indexOf("@")>2 && email.indexOf(".")>email.indexOf("@")){
                    setvalidEmail(true)
                }else{
                    setvalidEmail(false);
                    setTimeout(toast,3000);
                    return
                }
            }
        }
        
        if(userExsist){
            return
        }
        if(emailExsist){
            return
        }

        const userdata = {"user":user,"email":email,"password":password}
        fetch("https://quiet-depths-68559.herokuapp.com/signup",{
            method:"post",
            headers:{
                'Content-Type':"Application/json"
            },
            body:JSON.stringify(userdata),
        }).then(res=>{
            return res.json()
        }).then(res =>{
            if(res.res === "success"){
                setIsUserCreated(true);
            }else{
                setErr(true);
                setTimeout(toast,5000);
            }
            
        }).catch(err=>{
            setErr(true);
            setTimeout(toast,5000);
        })
    }

    return(
        <div>
            <Header/>
            <Footer/>
            <div className="container">
                <p style={{fontFamily:"sans-serif"}}>Track your favourite products price and get alerts when the price drops <i className="bi bi-bell-fill"></i></p>
                <h5>Supported Sites </h5>
                <ul>
                    <li style={{color:"#adad4c"}}><b>Amazon</b></li>
                    <li style={{color:"#1b4dd8"}}><b>Flipkart</b></li>
                    <li style={{color:"#ca4141"}}><b>Snapdeal</b></li>
                </ul>
            </div>
            <h5 style={{textAlign:"center"}}>Signup</h5>
            <div className="container">
               <div className="input-group mb-3">
                   <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                   <input type="text" className="form-control" onBlur={checkmail} onChange={(e)=>setEmail(e.target.value)}/>
               </div>
               {emailEmpty?<p style={{color:"red"}}>Email cannot be empty</p>:""}
               {emailExsist?<p style={{color:"red"}}>Email Already in use, use another email</p>:""}
               {validEmail?"":<p style={{color:"red"}}>Enter Valid Email address</p>}
               <div className="input-group mb-3">
                   <span className="input-group-text" id="inputGroup-sizing-default">Username</span>
                   <input type="text" className="form-control" onBlur={checkusername} onChange={(e)=>setUser(e.target.value)}/>
               </div>
               {userEmpty?<p style={{color:"red"}}>Username cannot be smaller than 6 letters</p>:""}
               {userExsist?<p style={{color:"red"}}>Username taken use another one</p>:""}
               <div className="input-group mb-3">
                   <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                   <input type="text" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
               </div>
               {passwordEmpty?<p style={{color:"red"}}>Password Cannot be lessthan 6 characters</p>:""}
               <div className="input-group mb-3">
                   <button className="btn btn-primary" onClick={signup}>Signup</button>
               </div>
               {isuserCreate?<h5 style={{color:"green"}}>User Created Successfully</h5>:""}
               {err?<p style={{color:"red"}}>Error Occured</p>:""}
               <div className="input-group mb-3">
                   <span>Already have account Login here &nbsp;</span>
                   <Link to="/login">Login</Link>
               </div>
        </div>
        </div>
    )
}

export default SignUp;