
import ItemCount from '../ItemCount/ItemCount'

const ItemDetail = ({id, name, img, description, price, stock}) => {
    const handleOnAdd = (quantity) => {
        console.log('se agrego al carrito ' + quantity)

    } 


    return (  
        <div> 
            <h1>{name}</h1>
            <img src={img} alt={name}/>
            <p>{description}</p>
            <h2>$ {price}</h2>
            {/* { stock = 0? <ItemCount stock={stock} onAdd={handleOnAdd}/> : <h1>No hay stock</h1>} */}
            <ItemCount stock={stock} onAdd={handleOnAdd}/>
        </div>

    )


}

export default ItemDetail