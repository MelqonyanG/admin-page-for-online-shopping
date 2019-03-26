import React from 'react';
import Menu from '../onlineShop/Menu/Menu'
import ProductList from '../onlineShop/ProductList/ProductList'
import StoreList from '../onlineShop/StoreList/StoreList'
import ShoppingCart from '../onlineShop/ShoppingCart/ShoppingCart'

class User extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      page: 'cart'
    }

    this.onSelect = this.onSelect.bind(this);
  }

  componentWillMount(){
    document.body.style.backgroundImage='none';
  }

  onSelect(page){
    this.setState({page: page});
  }

  render(){
    const page = this.state.page;
    return (
        <div className="container">
          <div className='row'>
            <Menu onSelect={this.onSelect}/>
          </div>
          <div className="row">
            {
              page === 'product'?
              (
                <ProductList />
              ):(
                page === 'store' ?(
                  <StoreList />
                ):(
                  <ShoppingCart />
                )
              )
            }
          </div>
        </div>
    );
  }
}

export default User;
