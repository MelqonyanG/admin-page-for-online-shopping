import React from 'react';
import {SOCKET} from '../../index';
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class StoreList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: []
    };

    SOCKET.on('stores_list', (data)=>{
      this.setState({stores: data})
    })
  }

  componentWillMount(){
    SOCKET.emit('get_stores_list')
  }

  componentWillUnmount(){
    SOCKET.removeListener('stores_list');
  }

  render(){
    const stores = this.state.stores;
    console.log(stores);
    return(
      <div className='container'>
        <BootstrapTable data={stores} striped hover>
          <TableHeaderColumn isKey dataField='id'>Store ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Store Name</TableHeaderColumn>
          <TableHeaderColumn dataField='address'>Store address</TableHeaderColumn>
          <TableHeaderColumn dataField='phone'>Store phone</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

export default StoreList;
