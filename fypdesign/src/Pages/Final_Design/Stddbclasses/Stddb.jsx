import React from "react";
import Dbcard from "../../../Components/Scomponent/Dbcard/Dbcard";
import styles from "./Stddb.module.css";

function Stddb() {
  return (
    <>
      <div className={styles.Dashboard}>
        {" "}
        <Dbcard></Dbcard>
      

      </div>
    </>
  );
}

export default Stddb;
