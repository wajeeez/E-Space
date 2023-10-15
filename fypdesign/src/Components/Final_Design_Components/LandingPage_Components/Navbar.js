import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';

function Navbar() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    setScreenWidth(window.innerWidth);
    if (window.innerWidth <= 900) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', showButton);
    return () => {
      window.removeEventListener('resize', showButton);
    };
  }, []);

  const changeBackground = () => {
    if (window.pageYOffset >= 640) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  return (
    <>
      <nav className={navbar || screenWidth <= 420 ? 'navbar active' : 'navbar'}>
        <div className='navbar-container'>
          <div className='navbar-logo' onClick={closeMobileMenu}>
            <img src="../images/logo2.png" alt='logo' />
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
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                About Us
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/signin/options'
                className='nav-links'
                onClick={closeMobileMenu}
                style={{ fontWeight: 'bold', color: 'blue' }}
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
