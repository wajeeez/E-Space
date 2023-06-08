import React from 'react'
import styles from "./Button.module.css"

function Button(props) {
    return (
        <button className={styles.btn}> {props.btn} </button>
    )
}

export default Button