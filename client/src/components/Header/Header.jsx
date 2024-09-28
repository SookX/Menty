import './header.less'
import logo from '../../img/logo.png'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const Header = () => {
    return (
        <header className="header">
            <nav className='nav'>
                <HashLink to='/#'><img src={logo} alt="Menty Logo" className='nav-logo' /></HashLink>

                <HashLink className='nav-link' to='/#about'>How it works</HashLink>
            </nav>

            <nav className='nav'>
                <Link to='/login' className='nav-link'>Log in</Link>
                <Link to='/register' className='nav-link'>Sign up</Link>
            </nav>
        </header>
    )
}

export default Header