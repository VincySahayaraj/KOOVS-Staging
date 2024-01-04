import React from 'react'
import "./maincategorymenuslider.css"
function CategoryMenuSlider() {

    return (
        <section className='maincategory_menu_slider d-none d-lg-block'>
            <h4 className='text-menu fw-bold d-lg-none'>Where do you want to start?</h4>
            <div className='maincategory-buttons'>

                <div className='btn'>
                    <button className='maintext-button'>New In</button>

                </div>
                <div className='btn '>
                    <button className='maintext-button'>Striped t-shirts</button>

                </div>
                <div className='btn '>
                    <button className='maintext-button'>Plain t-shirt</button>

                </div>
                <div className='btn '>
                    <button className='maintext-button'>Scoop neck t-shirt</button>

                </div>
                <div className='btn '>
                    <button className='maintext-button'>Printed t-shirt</button>

                </div>
                <div className='btn'>
                    <button className='maintext-button'>Crew neck t-shirt</button>

                </div>
                <div className='btn'>
                    <button className='maintext-button'>V neck t-shirt</button>
                </div>
            </div>
        </section>
    )
}

export default CategoryMenuSlider