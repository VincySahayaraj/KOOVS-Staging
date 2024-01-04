import React from 'react';
import './notsignedwishlist.css';
import wishlistimg from '../../assets/images/wishlistimg.png';
import { GrDiamond } from 'react-icons/gr';
import LoginForm from '../LoginForm/LoginForm';


const NotSignedWishlist = () => {
    
    return (
        <>
            <section className="wishlistnotsignedin-section">
                <p className='notsignedin-heading d-sm-block d-lg-none'>Wishlist</p>
                <p>
                    Looking for your wishlist? Sign in to pick up where you left off.
                </p>
                {/* <div className='signedin d-flex'>
                    <button type="button" className='signin-button'>SIGN IN</button>
                </div> */}
                <div className='wishlist-not-signed'>
                <LoginForm/>    
                </div>
           
            </section>



            <section className='offer-wishlist d-lg-none d-xl-none d-md-none d-xs-block d-sm-block'>
                <div className='wishlist-img'>
                    <img src={wishlistimg} className='image-wishlist' alt="wishlist" />
                </div>
                <p className='discount-text'>SIGN UP AND GET 10% OFF <GrDiamond className='diamond-icon' />
                </p>

            </section>
            <section className='popup-signup d-lg-none d-xl-none d-md-none d-xs-block d-sm-block'>
                <div>
                    <p className='promotion-text'>Sign up for early sale access, new in, promotions and more. </p>
                </div>
                <div className='wear-text'>
                    <p>Womenswear</p>
                    <p><u>Menswear</u></p>
                </div>
                <div className='signup-wishlist'>
                    <input type='email' id='signinwishlist' className='signinwishlist' placeholder='Email address'></input>
                    <button type='button' className='signup-button'>SIGN UP</button>
                </div>
                <p className='subscribe-text'>By subscribing you agree with our Tems and Conditions and Privacy Policy.
                    To opt out, click unsubscribe at the bottom of our emails. </p>
            </section>
        </>
    )
}

export default NotSignedWishlist