import React from 'react';
import styles from  './stickyfooter.module.css';
  
const StickyFooter = () => (
  <footer className={styles.stickyfooter}>
   <div className={`${styles.footerbutton} d-block`}>
          <button type="btn"  className={`mt-4 ${styles.btnStyle}`} >VIEW ITEMS</button>
        </div>
  
  </footer>
);
  
export default StickyFooter;