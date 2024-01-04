import React from 'react'
import "./categorymenuslider.css"
function CategoryMenuSlider() {

    return (
        <section className='category_menu_slider'>
            <h4 className='text-menu fw-bold d-block d-lg-none'>Where do you want to start?</h4>
            <div className='category-buttons'>

                <div className='btn'>
                    <button className='text-button'>New In</button>

                </div>
                <div className='btn '>
                    <button className='text-button'>Clothing</button>

                </div>
                <div className='btn '>
                    <button className='text-button'>Footwear</button>

                </div>
                <div className='btn '>
                    <button className='text-button'>Party clothing</button>

                </div>
                <div className='btn '>
                    <button className='text-button'>Dresses,Skirts</button>

                </div>
                <div className='btn'>
                    <button className='text-button'>Jackets,Coats</button>

                </div>
                <div className='btn'>
                    <button className='text-button'>Sneakers</button>

                </div>
                <div className='btn '>
                    <button className='text-button'>Footwear</button>

                </div>
                <div className='btn'>
                    <button className='text-button'>Party clothing</button>

                </div>
            </div>
            {/* <div className='row d-none d-lg-none'>

                
                <div id="outer">

                    <button class="div">New In</button>
                    <button class="div">Clothing</button>
                    <button class="div">Footwear</button>
                    <button class="div">Party clothing</button>
                    <button class="div">Dresses,Skirts</button>
                    <button class="div">Jackets,Coats</button>
                    <button class="div">Sneakers</button>
                    <button class="div">Footwear</button>
                    <button class="div">Party clothing</button>
                </div>
            </div> */}
        </section>
    )
}

export default CategoryMenuSlider