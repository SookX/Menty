import './header.less'
import logo from '../../img/logo.png'
import pfp from '../../img/pfp.png'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { useContext } from 'react'
import { DataContext } from '../../context/DataContext'

const Header = () => {
    // Gets global data from the context
    const { navigate, access, setAccess, setRefresh } = useContext(DataContext)



    // Log out
    const handleLogOut = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setAccess(null)
        setRefresh(null)
        navigate('/')
    }



    return (
        <header className="header">
            <nav className='nav'>
                <HashLink to='/#'><img src={logo} alt="Menty Logo" className='nav-logo' /></HashLink>
                <HashLink className='nav-link' to='/#about'>How it works</HashLink>
                {
                    access &&
                    <Link to='/dashboard' className='nav-link'>Dashboard</Link>
                }
            </nav>

            <nav className="nav">
                {/* <img src={pfp} alt="Default Profile Picture" className='nav-pfp' /> */}
                {
                    access ?
                    <>
                        <Link to='/' className='nav-link' onClick={handleLogOut}>Log out</Link>
                    </>
                    :
                    <>
                        <Link to='/login' className='nav-link'>Log in</Link>
                        <Link to='/register' className='nav-link'>Sign up</Link>
                    </>

                }
            </nav>
        </header>
    )
}

export default Header