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
            values,
            errors,
            touched,
            isSubmitting,
            handleBlur,
            handleChange,
            handleSubmit,
        } = useFormik({
            initialValues: {
            name: "",
            email: "",
            edad: "",
            password: "",
            confirmPassword: "",
            },
            validationSchema: basicSchema,
            onSubmit,
        });
    

    const { cart,getTotal, clearCart } = useContext(CartContext)
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()




    const handleCreateOrder = async () => {
        setLoading(true)


        try{
            const datosCliente = {
                buyer: { 
                    name: 'name',
                    email: 'email',
                    phone: 'phone'
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
                console.log('Intentalo nuevamente');

            }finally {
                    setLoading(false)
            }

    }

    if(loading) {
        return <h1>Procesando orden...</h1>

    }


    return (

        /* Form */

        <div className="checkout">
            <h1>Checkout</h1>

            {/* form */}

            <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="name">Nombre</label>
                <input
                    value={values.name}
                    onChange={handleChange}
                    id="name"
                    type="name"
                    placeholder="Ingrese su nombre"
                    onBlur={handleBlur}
                    className={errors.name && touched.name ? "input-error" : ""}/>
                {errors.name && touched.name && <p className="error">{errors.name}</p>}
                <label htmlFor="email">Email</label>
                <input
                    value={values.email}
                    onChange={handleChange}
                    id="email"
                    type="email"
                    placeholder="Ingrese su email"
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? "input-error" : ""}
                />
                {errors.email && touched.email && <p className="error">{errors.email}</p>}
                <label htmlFor="age">Edad</label>
                <input
                    id="edad"
                    type="number"
                    placeholder="Ingrese su edad"
                    value={values.edad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.edad && touched.edad ? "input-error" : ""}
                />
                {errors.edad && touched.edad && <p className="error">{errors.edad}</p>}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.password && touched.password ? "input-error" : ""}
                />
                {errors.password && touched.password && (
                    <p className="error">{errors.password}</p>
                )}
                <label htmlFor="confirmPassword">Repita su contraseña</label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repita su contraseña"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                    errors.confirmPassword && touched.confirmPassword ? "input-error" : ""
                    }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                )}
                <button className="precesarPedido" onClick={handleCreateOrder} disabled={isSubmitting} type="submit">
                    Procesar pedido
                </button>
            </form>

            {/* form finished */}

        
            {/* <button className="precesarPedido" onClick={handleCreateOrder}>Procesar pedido</button> */}
        </div>
    )
}

export default Checkout