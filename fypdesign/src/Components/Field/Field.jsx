import React from 'react';
import styles from "./Field.module.css";


function Field(props) {
    return (
        <div  className={styles.textInputWrapper} >
         <input{...props}/>
        </div>
    );

}

export default Field;