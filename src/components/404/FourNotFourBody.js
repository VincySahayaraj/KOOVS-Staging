import React from "react";
import styles from "./fournotfour.module.css";
function FourNotFourBody() {
  return (
    <>
      <section className={`${styles.four_not_four} container-fluid`}>
        <div className={`row ${styles.padded_content}`}>
          <div className={styles.four_not_four_body}>
            
          <div className="col d-flex justify-content-center">
                <div className="col-6"> 404 Not Found!</div>
                
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default FourNotFourBody;
