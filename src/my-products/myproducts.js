import {React, useEffect, useState} from 'react';
import TrackCard from "../track-card";
import {Link} from "react-router-dom";
import "./index.css"
const MyProducts = ({refresh}) => {
    const [products,setProducts] = useState([])
    const [noproducts,setnoproducts] = useState(false);
    const[err,seterr] = useState(false)
    const deleteproduct = (product) => {
        const user = {"user":product.userid,"link":product.link}
        fetch("https://quiet-depths-68559.herokuapp.com/delete",{
            method:"post",
            headers:{
                "Content-Type":"Application/json",
            },
            body:JSON.stringify(user)
        }).then((res)=>{
            return res.json()
        }).then(res => {
            if(res.res){
                console.log("Deleted")
                setProducts(products.filter(p => p.link !== product.link))
            }else{
                console.log("Failed to delete");
            }
        }).catch(err =>{
            console.log(err);
        })
    }

    useEffect(()=>{
        let user = sessionStorage.getItem("user")
        if(user!==null){
            user = JSON.parse(user);
            user = user.userid;
            fetch("https://quiet-depths-68559.herokuapp.com/",{
            method:"post",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({"user":user})
        }).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            setProducts([...res.res])
            if(res.length===0){
                seterr(false)
                setnoproducts(true);
            }else{
                seterr(false)
                setnoproducts(false)
            }
        }).catch(err =>{
            seterr(true);
            console.log(err)
        })
        }
        
    },[refresh]);
    if(err){
        return(
            <div className="container">
            <h3>Your trackers</h3>
            <p>Error Occured</p>
        </div>
        )
    }

    if(noproducts){
        return(
            <div className="container">
            <h3>Your trackers</h3>
            <p>You have no products in tracking</p>
        </div>
        )
    }else{

    return(
        <div className="container">
            <h3>Your trackers</h3>
            {products.length>0?<div className="main-container">
                {products.map((product,i)=>{
                return(
                    <div key={i} className="card-container">
                        <TrackCard product={product}/>
                        <p>Last Checked at {product.lastcheckedtime}</p>
                        <div className="option-container">
                            <div className="product-link">
                                <a target="_blank" href={product.link}><button className="btn btn-primary">Buy</button></a>
                            </div>
                            <div className="delete-btn">
                                <button className="btn btn-secondary" onClick={()=>deleteproduct(product)}>Delete</button>
                            </div>
                        </div>
                    </div>

                )
            })}
            </div>:<div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>}
        </div>
    )
        }
}

export default MyProducts;