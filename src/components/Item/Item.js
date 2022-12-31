import { Link } from "react-router-dom"
import "./Item.css"

const Item = ({ product }) => {
return (

        <div className="card">
            <img src={product.img} alt={product.name}/>
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>$ {product.price}</p>
            <Link className="detalleProducto" to={`/detail/${product.id}`}>Ver detalle</Link>
        </div>
    
    )    

} 

export default Item