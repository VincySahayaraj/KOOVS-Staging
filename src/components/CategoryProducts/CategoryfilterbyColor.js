import React, { useState } from 'react';
import styles from './categoryfilterbycolor.module.css';
import { GrClose } from 'react-icons/gr';
import StickyFooter from './StickFooter';

import { Accordion } from "react-bootstrap";


const CategoryfilterbyColor = ({ setColor }) => {

  const [isSelect, setSelect] = useState(false);
  return (
    <>
      <div className={styles.list_color}>
        <div className={`${styles.closebutton} d-flex `}>
          <GrClose className={styles.closeicon} onClick={() => setColor(false)} />
          <p className={`${styles.filterbutton} d-flex `}>Color</p>
        </div>

        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0" className={styles.productborder} >
            <Accordion.Header className='arrownone'>
              <span className={styles.color_black}></span>
              <p>Black</p>
            </Accordion.Header>

          </Accordion.Item>
          <Accordion.Item eventKey="1" className={styles.productborder}>
            <Accordion.Header className='arrownone' >
              <span className={styles.color_grey}></span>
              <p>Grey</p>
            </Accordion.Header>

          </Accordion.Item>
          <Accordion.Item eventKey="2" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
              <span className={styles.color_lightgrey}></span>
              <p onClick={() => setSelect(!isSelect)}>Light grey {isSelect && <i class="fa fa-check" aria-hidden="true"></i>}</p>
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="3" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
              <span className={styles.color_multi}></span>
              <p>Multi</p>
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="4" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
              <span className={styles.color_navy}></span>
              <p>Navy</p>
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="5" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
              <span className={styles.color_petroleum}></span>
              <p>Petroleum</p>

            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
              <span className={styles.color_blue}></span>
              <p>Blue</p>
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
              <span className={styles.color_turquise}></span>
              <p>Turquise</p>
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
              <span className={styles.color_lightblue}></span>
              <p>Light blue</p>
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
              <span className={styles.color_brown}></span>
              <p>Brown</p>
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
            <span className={styles.color_olive}></span>
                                        <p>Olive</p>
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
            <span className={styles.color_armygreen}></span>
                                        <p>Army green</p>
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
            <span className={styles.color_green}></span>
                                        <p>Green</p>
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
            <span className={styles.color_mint}></span>
                                        <p>Mint</p> 
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
            <span className={styles.color_rust}></span>
                                        <p>Rust</p>
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
            <span className={styles.color_orange}></span>
                                        <p>Orange</p>
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
            <span className={styles.color_peach}></span>
                                        <p>Peach</p>
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
            <span className={styles.color_yellow}></span>
                                        <p>Yellow</p>
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={styles.productborder}>
            <Accordion.Header className='arrownone'>
            <span className={styles.color_beige}></span>
                                        <p>Beige</p>
            </Accordion.Header>
          </Accordion.Item>
       

        </Accordion>


      </div>
      <StickyFooter />

   
    </>
  )
}

export default CategoryfilterbyColor