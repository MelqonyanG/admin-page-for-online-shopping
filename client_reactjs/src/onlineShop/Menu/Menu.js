import React from 'react';

class Menu extends React.Component {
    render(){
      return (
        <div className="container">
          <nav className="navbar navbar-dark bg-dark" style={{width: '100%'}}>
            <div>
              <button type="button" className="btn btn-secondary" onClick={()=>{this.props.onSelect('cart')}}>Shopping Cart</button>
              <button type="button" className="btn btn-secondary" onClick={()=>{this.props.onSelect('product')}}>Products</button>
              <button type="button" className="btn btn-secondary" onClick={()=>{this.props.onSelect('store')}}>Stores</button>
            </div>
          </nav>
        </div>
      );
    }
}

export default Menu;
