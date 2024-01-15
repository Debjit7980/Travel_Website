import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { LoginContext } from './Context'

function Navbar() {
    const { loginData, setLoginData } = useContext(LoginContext);
    //console.log(loginData.validUserOne);
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [navbar, setNavbar] = useState(false);
    //const {name}=props.batch;
    const navigate = useNavigate();
    const logoutUser = async () => {
        try {
            let token = localStorage.getItem("userDataToken");
            const res = await fetch("https://naturesdeck-trekcamp-backend-app.onrender.com/logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                    Accept: "application/json"
                },
                credentials: "include"

            });
            const data = await res.json();
            console.log("The data: ",data);
            if (data.status === 201) {
                console.log("User Logged Out");
                localStorage.removeItem("userDataToken");
                setLoginData(false);
                navigate("/login");
            }
            else {
                console.log("Error logging out");
            }
        }
        catch (e) {
            console.log("Error is: ", e);
        }
    }

    const changeNav = () => {
        if (window.scrollY >= 90) {
            setNavbar(true);
        }
        else {
            setNavbar(false);
        }
    };
    window.addEventListener('scroll', changeNav);
    return (
        <>
            <nav className={navbar ? 'navbar active' : 'navbar'}>
                <div className={navbar ? 'navbar-container active' : 'navbar-container'}>
                    <Link to='/' className="navbar-logo"><i className="fa-sharp fa-solid fa-person-hiking" style={{ fontSize: 35 }}></i> NaturesDeck</Link>
                    <ul className={click ? '#navitems active' : '#navitems'} id={"navitems"}>
                        <li className='nav-item link' >
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home </Link>
                        </li>
                        <li className='nav-item link'>
                            <Link to='/services' className='nav-links' onClick={closeMobileMenu}>Blogs</Link>
                        </li>
                        <li className='nav-item link'>
                            <Link to='/products' className='nav-links' onClick={closeMobileMenu}>Products</Link>
                        </li>
                        {loginData.validUserOne ?
                            <>
                                <li className='nav-item' style={{ marginLeft: 100 }} id="signUp">
                                    <div className='signUp' onClick={()=>{handleClick(); closeMobileMenu()}}>
                                        <Link to='/' className='nav-links-mobile' onClick={closeMobileMenu} id="si">{loginData.validUserOne.username}</Link>
                                        <div className='dropdown-content'>
                                                <Link to='/profile' className='links' id="profile" onClick={closeMobileMenu}>
                                                    Profile
                                                </Link>
                                            <button className='links' onClick={() =>{ closeMobileMenu() ;logoutUser()}}>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </> :
                            <>
                                <li className='nav-item' style={{ marginLeft: 100 }} id="signUp">
                                    <div className='signUp'>
                                        <Link to='/signup' className='nav-links-mobile' onClick={closeMobileMenu}>Sign Up</Link>
                                    </div>
                                </li>
                            </>
                        }
                    </ul>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                </div>
            </nav>

        </>

    )
}

export default Navbar
