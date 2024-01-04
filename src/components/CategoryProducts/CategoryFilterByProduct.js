import React from 'react';
import style from './categoryfilterbyproduct.module.css';
import { GrClose } from 'react-icons/gr';
import StickyFooter from './StickFooter';
import { Accordion } from "react-bootstrap";


const CategoryFilterByProduct = ({ setProduct }) => {
    return (
        <>
            <div className={style.list_Product}>
                <div className={`${style.closebutton} d-flex `}>
                    <GrClose className={style.closeicon} onClick={() => setProduct(false)} />
                    <p className={`${style.filterbutton} d-flex `}>Product Type</p>
                </div>

                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0" className={style.productborder} >
                        <Accordion.Header className='arrownone'> Hoodies (3) </Accordion.Header>

                    </Accordion.Item>
                    <Accordion.Item eventKey="1" className={style.productborder}>
                        <Accordion.Header className='arrownone' > Joggers (10)</Accordion.Header>

                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className={style.productborder}>
                        <Accordion.Header className='arrownone'>  Polo shirts (1)</Accordion.Header>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3" className={style.productborder}>
                        <Accordion.Header className='arrownone'>  Shirts (5)</Accordion.Header>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4" className={style.productborder}>
                        <Accordion.Header className='arrownone'> Sweatshirts (6)</Accordion.Header>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5" className={style.productborder}>
                        <Accordion.Header className='arrownone'> T-shirts (8,901)</Accordion.Header>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6" className={style.productborder}>
                        <Accordion.Header className='arrownone'> Vests (602)</Accordion.Header>
                    </Accordion.Item>
                </Accordion>
            </div>
            <StickyFooter />
        </>
    )
}

export default CategoryFilterByProduct