import React, { useState } from 'react';
import { sites } from '../sites';
import './index.css'
const Form = ({getSite}) => {
    const [site,setsite] = useState("");
    const [url,setUrl] = useState("");

    const handleDropdown = (newval)=>{
        setsite(newval);
    }

     const handleOnClick = () => {
        if(site===""){
            alert("Please select site")
            return
        }

        if(url===""){
            alert("Please Enter Product Url")
            return
        }

        if(site==="Amazon" && url.indexOf("amazon")<0){
            alert("Select Appropriate site and url")
            return
        }

        if(site==="Flipkart" && url.indexOf("flipkart")<0){
            alert("Select Appropriate site and url")
            return
        }

        if(site==="Snapdeal" && url.indexOf("snapdeal")<0){
            alert("Select Appropriate site and url")
            return
        }
        
        getSite(site,url);
        setUrl("")
    }

    return(
        <div className="form-container container">
            <div className="input-group mb-3">
                <button className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                    {site?site:"Site"}
                </button>
                <ul className="dropdown-menu">
                    {sites.map((site)=>{
                        return(
                            <li key={site} className="dropdown-item" onClick={()=>handleDropdown(site)}>{site}</li>
                        )
                    })}
                </ul>
                <input type="text" required value={url} aria-label="Text input with dropdown button" className="form-control" onChange={(e)=>{
                    let y = e.target.value.split("?")
                    setUrl(y[0])}}/>
            </div>
            <div className="get-price">
                <button className="btn  btn-outline-info" onClick={handleOnClick}>
                    Track Price  <i className="bi bi-arrow-right-circle w"></i>
                </button>
            </div>
        </div>
    )
}

export default Form;