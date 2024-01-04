import React from 'react';
import styles from './searchproduct.module.css';

const SearchNoResult = () => {
  return (
    <>
      <section className={styles.search_products}>
        <div className={`${styles.search_function} d-lg-block d-none`}>
         
        </div>
        <input type='text' className={` ${styles.type_text} d-lg-block d-none`} placeholder='Type to search' id={`${styles.type_text}  `} ></input>
        <div className={`${styles.search_box} d-lg-none d-block`}>
        <input type="search" id="searchProduct" name="searchProduct" placeholder='SEARCH' className={`mt-4 ${styles.btnStyle}`}/>
        </div>
        <div className={styles.searchContent}>
        <div className={styles.text_search}>
          <p>
            No Product is matching your search.
          </p>
        </div>
        </div>
        </section>
        </>
  )
}

export default SearchNoResult