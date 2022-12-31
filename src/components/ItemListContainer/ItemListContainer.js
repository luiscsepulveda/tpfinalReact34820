/* const ItemListContainer = ({greeting}) => {


    return <h1 className="titleHome">{greeting}</h1>
}

export default ItemListContainer */

import { useState, useEffect } from "react"
/* import {getProducts, getProductsByCategory} from '../../productsTshirts' */
import ItemList from '../ItemList/ItemList'
import {useParams} from 'react-router-dom' 
import "./ItemListContainer.css"
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'


const ItemListContainer = () => {
    const [products, setProducts] = useState ([]) 
    const [ loading, setLoading ] = useState (true)

    const {categoryId} = useParams()


    useEffect(() => {
        setLoading(true)
        const productsRef = categoryId /* collection(db, 'products') */ 
        ? query(collection(db, 'products'), where('category', '==', categoryId))
        :collection(db, 'products')

        getDocs(productsRef) 
            .then(response => {
                const productsAdapted = response.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data }
                })
                setProducts(productsAdapted)
            })

            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false)
            })

       /*  if (categoryId){
            getProductsByCategory(categoryId)
            .then(response => {
                setProducts(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else{
            getProducts()
            .then(response => {
                setProducts(response)
            })
            .catch(error => {
                console.log(error);
            })
        }    
                
         */

    }, [categoryId])

    if(loading) {
        return <h1>Cargando ...</h1>
    }



    return(
        <div className="containerH">
            <div className="banner1">
                <img className="homeBanner" src={'/images/banner/banner 3.png'} alt='home Banner'/>
            </div>

                <h1 className="homeTitle" >Welcome to STAND T-shirts</h1>
            
            <div className="cardH">
                <ItemList  products={products}/>
            </div>
        </div> 
        

    )

}

export default ItemListContainer