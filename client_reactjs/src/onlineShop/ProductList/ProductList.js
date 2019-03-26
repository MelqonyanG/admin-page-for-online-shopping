import React from 'react';
import {SOCKET} from '../../index';
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };

    SOCKET.on('products_list', (data)=>{
      this.setState({products: data})
    })
  }

  componentWillMount(){
    SOCKET.emit('get_products_list')
  }

  componentWillUnmount(){
    SOCKET.removeListener('products_list');
  }

  render(){
    const products = this.state.products;
    console.log(products);
    return(
      <div className='container'>
        <BootstrapTable data={products} striped hover>
          <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
          <TableHeaderColumn dataField='store_id'>Store ID</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

export default ProductList;
