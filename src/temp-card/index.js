import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '../track-card'
import "./index.css"
const Index = ({site,url,trackclick}) => {
    const [products,setProducts] = useState([]);
    const [isvisible,setIsvisible] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(false)
    const navigate = useNavigate()

    const getPrice = (site,url) => {
        
        setIsvisible(true);
        setIsLoading(true);
        fetch("https://quiet-depths-68559.herokuapp.com/vilas",{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({"sit":site,"ur":url})
        }).then(res => {
            return res.json();
        }).then(res => {
            if(res.res === "Invalid Url"){
                alert("invalid url")
            }else{
                res["url"] = url
                setProducts([...products,res])
                console.log(products)
            }
            setIsLoading(false)
            console.log(res)
        }).catch(err => {
            console.log(err);
            setIsLoading(false)
            setError(true)
        })
    }

    const track = (product) => {
        
        let user = sessionStorage.getItem("user")
        
        if(user!==null){
            
            user = JSON.parse(user)
            user = user.userid;
            const data = {"user":user,"product":product}
            fetch("https://quiet-depths-68559.herokuapp.com/add",{
                method:"post",
                headers:{
                    "Content-Type":"Application/json",
                },
                body:JSON.stringify(data)
            }).then(res => {
                return res.json()
            }).then(res => {
                if(res.res==="success"){
                    console.log("Tracker add successfully")
                    setProducts(products.filter(p => p.image !== product.image))
                    trackclick()
                }else if(res.res === "link exsist"){
                    console.log("Product is already in your tracking list");
                    setProducts(products.filter(p => p.image !== product.image))
                    
                }
                else{
                    console.log("Error occured please login")
                }
            }).catch(err => {
                console.log(err)
            });
        }else{
            navigate("/login")
        }
        
    }

    useEffect(()=>{

        let user = sessionStorage.getItem("user")
        if(user===null){
            navigate("/login")
        }else{
            user = JSON.parse(user)
            user = user.userid;
        }
        
        if(url){
            getPrice(site,url)
        }
    },[url])

    if(isvisible){
        if(isLoading){
            return(
                    <div className="spinner-container">
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div> 
                    </div>
            )
        }else{
            return(
                <div className="temp-container">
                            {products.map((product,i)=>{
                        return(
                                <div key={i} className="container">
                                    <Card  product={product}/>
                                    <button className="btn btn-secondary" onClick={()=>track(product,url)}>Track</button>
                                </div>
                        )
                    })}
                </div>
            )
        }
    }

    if(!isvisible){
        return(
            <div></div>
        )
    }
}



export default Index
