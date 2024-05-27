import './Header.css'
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import BasicMenu from '../Dropdown/Dropdown';

const Header=()=>{


    const {isAuthenticated,name}=useSelector((state)=>state.user.user)
    // console.log(isAuthenticated)

    return(
        <div className="header">
           <div className="main_header">
           <Link to='/'><h1>LoGo</h1></Link>
            <div className="callToAction">
                <ul>
                    <li>About us</li>
                    <Link to='/support' ><li>Contact</li></Link>
                    <li>Api</li>
                    {isAuthenticated ? (<BasicMenu name={name[0].toUpperCase()}/>):<Link to='/login'><li>Log in</li></Link>}
                </ul>
            </div>
           </div>
        </div>
    )
}

export default Header;