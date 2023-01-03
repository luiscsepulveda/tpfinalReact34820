import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import Swal from 'sweetalert2'
import { addDoc, collection, query, getDocs, where, documentId, writeBatch } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import { basicSchema } from '../../components/Schemas/Schemas'
import './Checkout.css'




const Checkout = () => {

    /* Crear Form pendiente*/

    const onSubmit = async (values, actions) => {
    
            await new Promise((resolve) => setTimeout(resolve, 1000));
            actions.resetForm();
        };
    
    
        const  {
            errors,
            touched,
            isSubmitting,
            handleBlur,
            
        } = useFormik({
            initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            },
            validationSchema: basicSchema,
            onSubmit,
        });
    

    const { cart,getTotal, clearCart } = useContext(CartContext)
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()
    const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");



    const handleCreateOrder = async () => {
        setLoading(true)


        try{
            const datosCliente = {
                buyer: { 
                    name: name,
                    email: email,
                    phone: phone,
                },
                items: cart,
                total: getTotal()

            }

            const batch = writeBatch(db)
            const ids = cart.map(prod => prod.id)

            const productRef = query(collection(db, 'products'), where(documentId(), 'in', ids))
            const productAgregadoDeDB = await getDocs(productRef)

            const { docs } = productAgregadoDeDB

            const outOfStock = []

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockBaseDato = dataDoc.stock
                
                const productAgregadoAlCarrito = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAgregadoAlCarrito?.quantity

                if(stockBaseDato >= prodQuantity) {
                    batch.update(doc.ref, {stock: stockBaseDato - prodQuantity})
                }else {
                    outOfStock.push({ id: doc.id, ...dataDoc })
                }
            })

                if(outOfStock.length === 0) {
                    await batch.commit()
                    const orderRef = collection(db, 'orders')
                    const pedidoAgregado = await addDoc(orderRef, datosCliente)

                    clearCart()

                    
                    /* vuelve al inicio  */
                    
                    setTimeout (() => {
                        navigate('/')
                    }, 1500)
                    
                    new Swal(pedidoAgregado.id);
                    

                    /* vuelve al inicio termino  */

                }else {
                    Swal("Sin stock, Se llevaron la ultima unidad");
                }
            }catch (error) {
                console.error('Intentalo nuevamente');

            }finally {
                    setLoading(false)
            }

    }

    if(loading) {
        return <h1>Procesando orden...</h1>

    }

    const handleSubmit = (e) => {
		e.preventDefault();
		handleCreateOrder();
	};


    return (

        /* Form */

        <div className="checkout">
            <h1>Checkout</h1>

            {/* form */}

            <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="name">Nombre</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    type="text"
                    placeholder="Ingrese su nombre"
                    onBlur={handleBlur}
                    className={errors.name && touched.name ? "input-error" : ""}/>
                {errors.name && touched.name && <p className="error">{errors.name}</p>}
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    placeholder="Ingrese su email"
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? "input-error" : ""}
                />
                {errors.email && touched.email && <p className="error">{errors.email}</p>}
                <label htmlFor="phone">Telefono</label>
                <input
                    id="phone"
                    type="number"
                    placeholder="Ingrese su telefono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={handleBlur}
                    className={errors.phone && touched.phone ? "input-error" : ""}
                />
                {errors.phone && touched.phone && <p className="error">{errors.phone}</p>}
                
                <button className="precesarPedido" onClick={handleCreateOrder} disabled={isSubmitting} type="submit">
                    Procesar pedido
                </button>
            </form>

            {/* form finished */}
        </div>
    )
}

export default Checkout