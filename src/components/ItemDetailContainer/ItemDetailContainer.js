import {useState, useEffect} from 'react'
/* import {getProductById} from '../../productsTshirts' */ 
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'


import {useParams} from 'react-router-dom'
import ItemDetail from '../ItemDetail/ItemDetail'
import './ItemDetailContainer.css'
/* import ItemCount from '../ItemCount/ItemCount' */


const ItemDetailContainer = () => {

   
    const [product, setProduct] = useState({})
    const [ loading, setLoading ] = useState(true)

    const {productId} = useParams()

    useEffect (() =>{ 

        const productRef = doc(db, 'products', productId)

        getDoc(productRef)
            .then(response =>{
                const data = response.data()
                const productAdapted = { id: response.id, ...data }

                setProduct(productAdapted)

            })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false)
                })

        /* getProductById(productId)
            .then(response =>{
                setProduct(response)
            })
            .catch(error =>{
                console.log(error);  
            })
 */

    },[productId])

    if(loading) {
        return <h1>Cargando ...</h1>
    }

    return(
    
    <div className='containerDetail'>
        <h2>Detalle del producto</h2>
        <ItemDetail {...product}/>

    </div>

    )
}

export default ItemDetailContainer