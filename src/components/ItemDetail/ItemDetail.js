/* import { useState } from 'react' */
import ItemCount from '../ItemCount/ItemCount'
import Swal from 'sweetalert2'
import './ItemDetail.css'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'


const ItemDetail = ({ id, name, img, description, price, stock }) => {
/*     const [quantity, setQuantity] = useState(0)
 */
    const { addItem, isInCart } = useContext(CartContext)

    const handleOnAdd = (quantity) => {
        Swal.fire({
            position: 'top-end',
            imageUrl: '/images/logo.png', 
            imageWidth: 150,
            icon: 'success',
            title: 'Tu carrito recibió ' + quantity + ' Productos',
            showConfirmButton: false,
            timer: 2500
        })

        addItem({ id, name, price, quantity })
/*         setQuantity(quantity)
 */        
    } 


    return (  
        <div className='productDetail'> 
            <div>
                <img src={img} alt={name}/>
            </div>
            <div>
                <h1>{name}</h1>
                <p>{description}</p>
                <h2>$ {price}</h2>
            { /* quantity > 0 */
            isInCart(id)
                ? <Link to='/cart' className='mostrarCarro'>terminar compra</Link>
                : stock > 0
                    ? <ItemCount  stock={stock} onAdd={handleOnAdd}/>
                    : <h1>No hay mas stock</h1>

            }

            </div>
            
        </div>

    )


}

export default ItemDetail