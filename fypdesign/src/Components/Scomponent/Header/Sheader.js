// import React, {useState} from 'react'
// // import { Link } from 'react-router-dom'
// // import './Sheader.module.css';
// import styles from "./Sheader.module.css";



// function Sheader() {
//   const [click, setClick] =useState(false);
//   const handleClick = () =>setClick(!click);
//   const closeMobileMenu =() =>setClick(false);

//   return (
//     <>

//     <nav className={styles.navbar}>
//         <div className={styles.navbar_container}>
//         {/* <Link to="/" className='navbar-logo'> */}
//           <p>Espace</p>
            
//         {/* </Link> */}

//         <div className={styles.menu_icon}>
//           <i className={click ? 'fas fa-time' : 'fas fa-bars'} />
//         </div>

//         <ul className={styles.nav_menu}>
//             <li className={styles.nav_item}>
//                 {/* <Link to='/' className='nav-link' onClick={closeMobileMenu}> */}
//                   Home
//                 {/* </Link> */}
//             </li>
//             <li className={styles.nav_item}>
//                 Feature 
//             </li>
//             <li className={styles.nav_item}>
//               Sing up
//             </li>

//           <ul>

//           </ul>
//         </ul>


//         </div>
        
//     </nav>
//     </>
//   )
// }

// export default Sheader


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Sheader.module.css";

function Sheader() {

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar_container}>
          Espace
            <i class='fab fa-typo3' />
          <div className={styles.menu_icon}>
            <i />
          </div>
          <ul  className={styles.nav_menu}>
            <li  className={styles.nav_item}>
                Home
            </li>
            <li  className={styles.nav_item}>
                Services
            </li>
            <li className={styles.nav_item}>
                Products
            </li>

            
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Sheader
// 