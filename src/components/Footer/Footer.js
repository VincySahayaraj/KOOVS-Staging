import React from "react";
import './footer.css';
import fbimg from '../../assets/images/fb.png';
import instaimg from '../../assets/images/instagram.png';
import twitterimg from '../../assets/images/twitter.png';
import youtubeimg from '../../assets/images/youtube.png';
import cardsimg from '../../assets/images/cards.png';
class Footer extends React.Component {
    render()
    {
    return(

        <footer className="footer-section">
            <div className="container-fluid">
                <div className="footer-content">
                    <div className="row py-lg-5 py-4">
                        <div className="col-xl-3 col-lg-4 col-12 pb-3">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <p>Account</p>  
                                </div>
                                <ul>
                                    <li><a href="/#">Orders and Returns</a></li>
                                    <li><a href="/#">My Information </a></li>
                                    <li><a href="/#">Wishlist </a></li>
                                    <li><a href="/#">Sign In</a></li>
                                    <li><a href="/#">Register</a></li>                                    
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-12 pb-3">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <p>Online support</p>  
                                </div>
                                <ul>
                                    <li><a href="/#">Contact </a></li>
                                    <li><a href="/#">Size Guide </a></li>
                                    <li><a href="/#">FAQs </a></li>
                                    <li><a href="/#">Shipping and Return </a></li>
                                    <li><a href="/#">Gift Card </a></li>     
                                    <li><a href="/#">Privacy Policy  </a></li>
                                    <li><a href="/#">Terms and Conditions </a></li>
                                    <li><a href="/#">Cookie Settings </a></li>                                 
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-12 pb-3">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <p>KOOVS</p>  
                                </div>
                                <ul>
                                    <li><a href="/#">About</a></li>
                                    <li><a href="/#">Careers </a></li>
                                    <li><a href="/#">Sustainability </a></li>                                   
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-12 pb-3">
                            <div className="footer-widget d-none d-lg-block">
                                <div className="footer-widget-heading">
                                    <p>Sign up for email updates and promotions</p>  
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                    <label htmlFor ="floatingPassword">Password</label>
                                </div>
                            </div>
                            <div className="footer-widget d-block d-lg-none">
                                <div className="footer-widget-heading d-flex justify-content-between align-items-center">
                                    <p className="mb-0">CONNECT WITH KOOVS</p> 
                                    <div className="d-flex gap-3 justify-content-center">
                                        <img src={fbimg} className="img-fluid" alt="Koovs fb "/>
                                        <img src={instaimg} className="img-fluid" alt="Koovs instagram "/>
                                        <img src={twitterimg} className="img-fluid" alt="Koovs twitter "/>
                                        <img src={youtubeimg} className="img-fluid" alt="Koovs youtube "/>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-0"/>
                    <div className="row pb-2 pt-2 align-items-center">
                        <div className="col-xl-4 col-lg-4 col-md-12 order-1 order-lg-0">
                            <p className="mb-0 mb-content">© Koovs.com 2022. All rights reserved.</p>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 order-lg-1">
                            <div className="d-none d-lg-flex gap-3 justify-content-center">
                                <img src={fbimg} className="img-fluid" alt="Koovs fb "/>
                                <img src={instaimg} className="img-fluid" alt="Koovs instagram "/>
                                <img src={twitterimg} className="img-fluid" alt="Koovs twitter "/>
                                <img src={youtubeimg} className="img-fluid" alt="Koovs youtube "/>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 order-0 order-lg-2">
                            <img src={cardsimg} className="img-fluid" alt="Koovs cards "/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
      
    )
    }
}

export default Footer;

