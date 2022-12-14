/* const ItemListContainer = ({greeting}) => {


    return <h1 className="titleHome">{greeting}</h1>
}

export default ItemListContainer */

import { useState, useEffect } from "react"
import {getProducts, getProductsByCategory} from '../../productsTshirts'
import ItemList from '../ItemList/ItemList'
import {useParams} from 'react-router-dom' 


const ItemListContainer = () => {
    const [products, setProducts] = useState ([]) 

    const {categoryId} = useParams()


    useEffect(() => {
        if (categoryId){
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
                
        

    }, [categoryId])

    return(
        
        <div>
            <h1>Listado de productos</h1>
            <ItemList products={products}/>
        </div>
    )

}

export default ItemListContainer