import React, { useState } from 'react';
import styles from './categoryfilterbybrand.module.css';
import { GrClose } from 'react-icons/gr';
import StickyFooter from './StickFooter';

const CategoryFilterbyBrand = ({ setBrand }) => {
  const [isSelect, setSelect] = useState(false);
  return (

    <>
      <div className={styles.search_brand}>
        <div className={`${styles.closebutton} d-flex `}>
          <GrClose className={styles.closeicon} onClick={() => setBrand(false)} />
          <p className={`${styles.filterbutton} d-flex `}>Brand</p>
        </div>
        <div className={`${styles.search_box} d-block`}>
          <input type="search" id="searchProduct" name="searchProduct" placeholder='SEARCH' className={`mt-4 ${styles.btnStyle}`} />
        </div>

        {/* suggested brands */}

        <h4 className={` ${styles.text_menu}`}>Suggested Brands</h4>
        <div className={` ${styles.brand_buttons}`}>

          <div className={styles.brand_btn}>
            <button className={styles.text_suggested}>361 Degree</button>

          </div>
          <div className={styles.brand_btn}>
            <button className={styles.text_suggested}>AMON</button>

          </div>
          <div className={styles.brand_btn}>
            <button className={styles.text_suggested}>Blue Saint</button>

          </div>
          <div className={styles.brand_btn}>
            <button className={styles.text_suggested}>Good Stuff</button>

          </div>
          <div className={styles.brand_btn}>
            <button className={styles.text_suggested}>LC Waikiki</button>

          </div>
          <div className={styles.brand_btn}>
            <button className={styles.text_suggested}>Peak</button>

          </div>
          <div className={styles.brand_btn}>
            <button className={styles.text_suggested}>Sid & Son</button>

          </div>
          <div className={styles.brand_btn}>
            <button className={styles.text_suggested}>X.O.Y.O</button>
          </div>
        
        </div>
        <div>
          <div>

            <div className={styles.dropdown_custom}>

              <div className={styles.dropdown_header}>A  </div>
              <div href="#" className={styles.items} onClick={() => setSelect(!isSelect)}>Adidas {isSelect && <i class="fa fa-check" aria-hidden="true" style={{position:"absolute",right:"40px"}}></i>}</div>
              <div href="#" className={styles.items} >Affend </div>
              <div href="#" style={{ paddingLeft: "33px" }} className="" >All reaons </div>

              <div className={styles.dropdown_header}>B</div>
              <div href="#" className={styles.items}>Billaborg</div>
              <div href="#" className={styles.items}>Brave</div>
              <div href="#" style={{ paddingLeft: "33px" }}>Burton</div>

              <div className={styles.dropdown_header}>C</div>
              <div href="#"style={{ paddingLeft: "33px" }}>Ci</div>

              <div className={styles.dropdown_header}>D</div>
              <div href="#" className={styles.items}>Degree</div>
              <div href="#" style={{ paddingLeft: "33px" }}>DIWAAH</div>
              <div className={styles.dropdown_header}>E</div>
              <div href="#" className={styles.items}>Elisa</div>
              <div href="#" className={styles.items}>Erika</div>
              <div href="#" style={{ paddingLeft: "33px" }} >Exolloxo</div>
              <div className={styles.dropdown_header}>F</div>
              <div href="#" className={styles.items}>Freakins</div>
              <div href="#" style={{ paddingLeft: "33px" }}>Freakins Unt.</div>

            </div>
          </div>
        </div>
      </div>
      <StickyFooter/>
    </>
  )
}

export default CategoryFilterbyBrand