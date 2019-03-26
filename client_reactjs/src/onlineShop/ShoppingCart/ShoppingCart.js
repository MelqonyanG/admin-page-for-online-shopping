import React from 'react';
import './ShoppingCart.css';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bill: 0
    };
  }

  render(){
    return(
      <div className='container'>
      <h2>Shopping Cart Bill</h2>
      <div className="row">
      <div className="col-25">
        <div className="container">
          <h4>Cart <span className="price" style={{color:"black"}}><i className="fa fa-shopping-cart"></i> <b>4</b></span></h4>
          <p><button type="button" className="btn-secondary">Product 1</button> <span className="price">$15</span></p>
          <p><button type="button" className="btn-secondary">Product 2</button> <span className="price">$5</span></p>
          <p><button type="button" className="btn-secondary">Product 3</button> <span className="price">$8</span></p>
          <p><button type="button" className="btn-secondary">Product 4</button> <span className="price">$2</span></p>
          <hr/>
          <p>Total <span className="price" style={{color:"black"}}><b>$30</b></span></p>
        </div>
      </div>
      </div>
      </div>
    )
  }
}

export default ShoppingCart;
