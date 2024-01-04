import React from 'react';
import Header from '../components/Header/Header';
import Cart from '../components/Cart/Cart';
import Footer from '../components/Footer/Footer';

class ProductCart extends React.Component {
  render()
  {
  return (
    <div className="ProductCart">
      
      <Header/>
      <Cart/>
      <Footer/>
    
    </div>
  );
 }
}

export default ProductCart;

