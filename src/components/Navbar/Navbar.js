/* import './Navbar.css'

import Button from '../Button/Button' */
/* import Logo from '../Logo/logo' */
/* import CartWidget from '../CartWidget/CartWidget'

const Navbar = (props) => {
    console.log(props)

    const handleOnClick = () => {
        alert('hice click')
    }
    
    const handleOnClick2 = () => {
        alert('hice otro click')
    }

const handleOnClick3 = () => {
        alert('hice otro click')
    }


    return (
        <nav className='navbar'>
            <section className='btnNavbar'>
                <Button className="link" colorText='blue' func={handleOnClick}>Home</Button>
                <Button colorText='blue' func={handleOnClick2}>About</Button>
                <Button colorText='blue' func={handleOnClick3}>Contact</Button>
            </section>
            <section>
                <CartWidget/>
            </section>
        </nav>
    )
}

export default Navbar */

import { Link } from "react-router-dom"

const Navbar =() => {

    return (
    <nav>
        <h1>Ecommerce</h1>
        <div>
            <Link to= '/'>Ver todo</Link>
            <Link to= '/category/tshirt'> Tshirts</Link>
            <Link to= '/category/Mujer'> mujer</Link>
        </div>
    </nav>
    )
}

export default Navbar
