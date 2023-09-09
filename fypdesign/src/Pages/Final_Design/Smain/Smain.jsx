import React from "react";
import SCard from "../../Scomponent/SCard/SCard";
import Sheader from "../../Scomponent/Header/Sheader";
import styles from "./Smain.module.css";
import {useNavigate } from "react-router-dom";



//bootstrap
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import bnr from '../../assets/bnr1.jpg';
import Sbutton from "../../Scomponent/Sbutton/Sbutton";
import HeroSection from "../../Scomponent/HeroSection/HeroSection";

function Smain() {
  const navigate = useNavigate("")

  return (
    <div>
      <div className={styles.main }></div>
      
    <Sheader></Sheader>




      <div className="container mt-4">
        {/* Main Content */}
        <div>
          <HeroSection></HeroSection>
      </div>

      <div >
        <SCard/>
        <SCard/>
        <SCard/>

        <button onClick={()=> {navigate("/login")}}>Login</button>

      </div>



        {/* Horizontal Images with Buttons */}
        <div className="row mt-4">
          <div className="col-md-6 mb-4">
            <img
              src="https://via.placeholder.com/300x200?text=Image1"
              className="img-fluid"
              alt="Image 1"
            />
            <button className="btn btn-primary mt-2">Button 1</button>
          </div>
          <div className="col-md-6 mb-4">
            <img
              src="https://via.placeholder.com/300x200?text=Image2"
              className="img-fluid"
              alt="Image 2"
            />
            <button className="btn btn-primary mt-2">Button 2</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        Simple Dark Footer
      </footer>
    </div>
  );
}

export default Smain;
