import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({stock, onAdd}) => {
    const [count, setCount] = useState(0)

    const decrement = () => {
        if(count > 0){
            setCount(prev => prev -1)
        }
    } 

    const increment = () => {
        if(count < stock){
            setCount(prev => prev +1)  
        }
    } 

return(
        <div className='sumaCarrito' >
            <p className='numberCart'>{count}</p>
            <button className='buttonCount' onClick={increment}>+</button>
            <button className='buttonCount' onClick={decrement}>-</button>            
            <button className='buttonCountCar' onClick={() => onAdd(count)} disabled={!count}>Agregar al carrito</button>
        </div>

    )
}

export default ItemCount