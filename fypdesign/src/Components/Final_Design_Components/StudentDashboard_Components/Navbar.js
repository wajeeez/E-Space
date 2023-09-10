// import React from 'react';
// import './Navbar.css';

// import menuImage from '../components/images/menu.png';
// import logoImage from '../components/images/logo1.png';

// const Navbar = ({ onNavbarButtonClick }) => {
//   return (
//     <div className="navbar-container">
//       <button onClick={onNavbarButtonClick}> {/* Call the handler */}
//         <img className="navbar-menu" src={menuImage} alt="Menu" />
//       </button>
//       <img className="navbar-image" src={logoImage} alt="Logo" />
//     </div>
//   );
// };

// export default Navbar;


import React from 'react';
import './Navbar.css';

import logoImage from '../../../Assets/images/logo1.png';

const Navbar = () => {
  return (
    <div className="navbar-contain">
      <img className="navbar-image" src={logoImage} alt="Logo" />
    </div>
  );
};

export default Navbar;
