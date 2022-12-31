import { useContext } from "react"
import { CartContext } from "../../context/CartContext"


const Checkout = () => {

    const { cart,getTotal } = useContext(CartContext)

    const handleCreateOrder = () => {
    const datosCliente = {
        buyer: {
            name: 'Juanito perez',
            email: 'juanito@gmail.com',
            phone: '98878765'
        },
        items: cart,
        total: getTotal()

    }
}

return (
    <div>
        <h1>Checkout</h1>
        <button onClick={handleCreateOrder}>Procesar pedido</button>
    </div>
)
}

export default Checkout