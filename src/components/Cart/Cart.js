import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import './Cart.css'
import { Link } from 'react-router-dom'

const Cart = ()  => {
    const { cart, getTotal, removeItem } = useContext (CartContext)

    const total = getTotal()


return (

    <div className="cart">
        <h1>Cart</h1>
        {
            cart.map(prod => {
                return (
                    <div className="detalleCompra" key={prod.id}>
                        
                            
                            
                            <h1> {prod.name}</h1>
                            <h2>$ {prod.price}</h2>
                            <h2>Cantidad: {prod.quantity}</h2> 
                            <h2>subtotal: {prod.price * prod.quantity}</h2>     
                            {/* Eliminar producto */} 
                            <button className="eliminarProducto" onClick={() => removeItem(prod.id)}> X</button>

                    

                    </div>                    

                )

            })
        }
        <h1> Total : {total}</h1>

        <Link to='/checkout'>Ir a pagar</Link>
    </div>

)

}

export default Cart