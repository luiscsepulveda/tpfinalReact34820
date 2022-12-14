const products =  [
    { 
        id: '1', 
        name: 'God first Bro', 
        price: 2500, 
        category: 'tshirt', 
        img:'/images/img_card/GFb man blue.png', 
        // img: '/images/nombredeimagen.jpg',
        stock: 25, 
        description:'GFB it is a nice tshirt'
    },
    { id: '2', name: 'Never panic just pray', price: 2500, category: 'tshirt', img:'/images/img_card/NPJP black_.png', stock: 15, description:'NPJP'},
    { id: '3', name: 'Faith', price: 1200, category: 'Mujer', img:'/images/img_card/Fatih blue women.png', stock: 10, description:'Faith'}
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 500)
    })
}

export const getProductById = (id) => {
    return new Promise (resolve => {
        setTimeout(() => {
            resolve(products.find(prod => {
                return prod.id === id
            }))
        }, 500)
    })
}

export const getProductsByCategory = (categoryId) => {
    return new Promise (resolve => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        }, 500)
    })
}