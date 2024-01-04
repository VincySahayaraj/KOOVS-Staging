import React from 'react';
import style from './categoryfilterbysize.module.css';
import { GrClose } from 'react-icons/gr';
import StickyFooter from './StickFooter';
import { Accordion } from "react-bootstrap";

const CategoryfilterbySize = ({setSize}) => {
  return (
    <>
    <div className={style.list_Product}>
    <div className={`${style.closebutton} d-flex `}>
        <GrClose className={style.closeicon} onClick={() => setSize(false)} />
        <p className={`${style.filterbutton} d-flex `}>Product Type</p>
    </div>
    
    <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0" className={style.productborder} >
            <Accordion.Header className='arrownone'> xxs </Accordion.Header>

        </Accordion.Item>
        <Accordion.Item eventKey="1" className={style.productborder}>
            <Accordion.Header className='arrownone' > xs</Accordion.Header>

        </Accordion.Item>
        <Accordion.Item eventKey="2" className={style.productborder}>
            <Accordion.Header className='arrownone'>  s</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="3" className={style.productborder}>
            <Accordion.Header className='arrownone'>  m</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="4" className={style.productborder}>
            <Accordion.Header className='arrownone'>l</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="5" className={style.productborder}>
            <Accordion.Header className='arrownone'> xl</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="6" className={style.productborder}>
            <Accordion.Header className='arrownone'> xxl</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="6" className={style.productborder}>
            <Accordion.Header className='arrownone'> xxxl</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="6" className={style.productborder}>
            <Accordion.Header className='arrownone'>size 32</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="6" className={style.productborder}>
            <Accordion.Header className='arrownone'> size 34</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="6" className={style.productborder}>
            <Accordion.Header className='arrownone'> size 36</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="6" className={style.productborder}>
            <Accordion.Header className='arrownone'> size 38</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="6" className={style.productborder}>
            <Accordion.Header className='arrownone'> size 40</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="6" className={style.productborder}>
            <Accordion.Header className='arrownone'> size 42</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="6" className={style.productborder}>
            <Accordion.Header className='arrownone'> size 44</Accordion.Header>
        </Accordion.Item>
    </Accordion>
</div>
<StickyFooter />
</>
  )
}

export default CategoryfilterbySize