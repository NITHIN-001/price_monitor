
import './track-index.css'
const Index = ({product}) => {
    const{price,image,descr,vendor} = product;
    return(
        
            <div>
                <div className="card card-container mb-3">
                <div className={vendor}>
                    <span style={{fontSize:'10px'}}>From </span>{vendor}
                </div>
                <img src={image} style={{height:"10rem"}} alt="" />
                <div className="card-body">
                    <h5 className="card-title custom-title">
                        ₹{price}
                    </h5>
                    <hr></hr>
                    <p className="card-text custom-text">
                        {descr}
                    </p>
                </div>
            </div>
            </div>
        
    )
}

export default Index