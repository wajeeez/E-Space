import React, { useState, useEffect, } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';



function Navbar() {

  const navigate = useNavigate()
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [navbar, setNavbar] = useState(false);

  const showButton = () => {
    if (window.innerWidth <= 900) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const changeBackground = () => {
    console.log(window.scrollY)
    if (window.scrollY >= 650) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }

  };

  window.addEventListener('scroll', changeBackground);

  return (
    <>
      <nav className={navbar ? 'navbar active' : 'navbar'}>
        <div className='navbar-container'>
          <div className='navbar-logo' onClick={closeMobileMenu}>
            <img src="../images/logo1.png" alt='logo' />
          </div>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link
                to='/'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Settings
              </Link>
            </li> */}

            {/* <li>
              <Link
                to='/'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li> */}
          </ul>
          {button &&
            <div onClick={() => {

              navigate("/signin/options")

            }}>
              <Button  buttonStyle='btn--outline'>Sign In</Button>
            </div>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
