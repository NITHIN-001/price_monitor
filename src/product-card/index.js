import React, { useEffect, useState } from 'react';
import UrlForm from '../form'
import TempCard  from '../temp-card';
import {useNavigate} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import MyProducts from '../my-products/myproducts';
const Index = () =>{
    const navigate = useNavigate()
    const [site,setSite] = useState("");
    const [url,setUrl] = useState("");
    const [user,setUser] = useState("");
    const [trackclicked,setTrackClicked] = useState(false)
    const getSite = (site,url)=>{
        setSite(site);
        setUrl(url);
    }

    const trackclick = () => {
        setTrackClicked(!trackclicked);
    }

    useEffect(()=>{
        let activeuser = sessionStorage.getItem("user")
        if(activeuser===null){
            navigate("/login")
        }else{
            activeuser = JSON.parse(activeuser)
            if(activeuser.userid!==""){
                setUser(activeuser.userid)
            }
        }
    })

    return (
        <div>
            <Header/>
            <div className="index-container">
            <UrlForm getSite={getSite}/>
            <TempCard trackclick={trackclick} site={site} url={url} />
            <MyProducts refresh={trackclicked}/>
        </div>
        <div style={{height:"100px"}}></div>
        <Footer/>
        </div>
    )
}

export default Index