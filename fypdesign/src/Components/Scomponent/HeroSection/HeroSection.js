
import React from 'react';
import styles from './HeroSection.module.css';
// import bnr from '../../assets/bnr2.jpeg'

function HeroSection() {
  return (
    <div className={styles.hero_container}>
        {/* <img src={bnr} className={styles.Heroimg}/> */}
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className={styles.hero_btns}>
        
       
      </div>
    </div>
  );
}

export default HeroSection;