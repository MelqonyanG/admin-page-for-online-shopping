import React from "react";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import {SOCKET} from "../../index";

const ADDRESSES = ['Armenia', 'Italy', 'Russia']
const DEFAULT_ADDRESS = ADDRESSES[0]

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class StoresList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      formVisibility: 'hidden',
      address: DEFAULT_ADDRESS,
      name: '',
      phone: '',
      mode: '',
      id: ''
    };

    this.show_add_store_form = this.show_add_store_form.bind(this);
    this.show_edit_store_form = this.show_edit_store_form.bind(this);
    this.close_add_store_form = this.close_add_store_form.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changePhone = this.changePhone.bind(this);
    this.add_store = this.add_store.bind(this);
    this.edit_store = this.edit_store.bind(this);
    this.delete_store = this.delete_store.bind(this);

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

  delete_store(id){
    const old_stores = this.state.stores;
    var stores = [];
    id = parseInt(id);
    for (var i = 0; i < old_stores.length; i++){
      if(old_stores[i].id !== id){
        stores.push(old_stores[i]);
      }
    }
    this.setState({stores: stores});
    SOCKET.emit('delete_store', id)
  }

  changeAddress(e){
    this.setState({address: e.value})
  }

  changeName(e){
    this.setState({name: e.target.value})
  }

  changePhone(e){
    this.setState({phone: e.target.value})
  }

  show_edit_store_form(id){
    var stores = this.state.stores;
    var store;
    for (var i=0; i < stores.length; i++){
      if(stores[i]['id'] === parseInt(id)){
        store = stores[i];
        break;
      }
    }

    if (store){
      this.setState({
        mode: 'edit',
        phone: store.phone,
        name: store.name,
        address: store.address,
        id: store.id,
        formVisibility: 'visible'
      });
    }
  }

  edit_store(){
    const id = this.state.id;
    const name = this.state.name;
    const phone = this.state.phone;
    const address = this.state.address;
    var stores = this.state.stores;

    var store;

    for (var i=0; i < stores.length; i++){
      if(stores[i]['id'] === parseInt(id)){
        store = stores.splice(i, 1)[0]
      }
    }

    if(store){
      store.address = address;
      store.phone = phone;
      store.name = name;

      stores.unshift(store);
      this.setState({
        stores: stores,
        mode: '',
        address: DEFAULT_ADDRESS,
        name: '',
        phone: '',
        id: '',
        formVisibility: 'hidden'
      })

      SOCKET.emit('edit_store', store);
    }
  }

  show_add_store_form(){
    this.setState({
      mode: 'add',
      formVisibility: 'visible'
    });
  }

  close_add_store_form(){
    this.setState({
      mode: '',
      address: DEFAULT_ADDRESS,
      name: '',
      phone: '',
      id: '',
      formVisibility: 'hidden'
    });
  }

  add_store(){
    const name = this.state.name;
    const phone = this.state.phone;
    const address = this.state.address;
    var stores = this.state.stores;
    var id = 0;
    for(var i = 0; i < stores.length; i++){
      if(stores[i]['id'] > id){
        id = stores[i]['id'];
      }
    }
    const store = {
      "id": id + 1,
      "name": name,
      "lat": 0,
      "lng": 0,
      "phone": phone,
      "address": address,
      "unfinished_orders":[],
      "finished_orders":[]
    }

    stores.unshift(store);
    this.setState({
      stores: stores,
      name: '',
      phone: '',
      mode: '',
      id: '',
      address: DEFAULT_ADDRESS,
      formVisibility: 'hidden'
    })

    SOCKET.emit('add_store', store);
  }

  render(){
    const { classes } = this.props;
    const stores = this.state.stores.map((store) => {
      return(
        [store.id.toString(), store.name, store.address, store.phone, store.unfinished_orders.length.toString(),
           store.finished_orders.length.toString(), 'd', 'e']
      )
    })
    return (
      <div>
        <div>
          <button type="button" className="btn btn-info" onClick={this.show_add_store_form}>Add</button><br/>
          <div style={{visibility: this.state.formVisibility}}>
            <div className="form-row">
              <div className="col">
                <input type="text" className="form-control" placeholder="name" onChange={this.changeName} value={this.state.name}/>
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="phone" onChange={this.changePhone} value={this.state.phone}/>
              </div>
              <div className="col">
                <Dropdown options={ADDRESSES} onChange={this.changeAddress} value={this.state.address} placeholder="Select an option"/>
              </div>
              <div className='col'>
                <button onClick={this.state.mode === 'edit' ?this.edit_store : this.add_store}><i className="fa fa-check" aria-hidden="true"></i></button>
                <button onClick={this.close_add_store_form}><i className="fa fa-close" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
        </div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Stores Tabel</h4>
                <p className={classes.cardCategoryWhite}>
                  Here is a list of all aveliable stores.
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["id", "name", "address", "phone", "unfinished orders", "finished orders"]}
                  tableData={stores}
                  edit={this.show_edit_store_form}
                  delete={this.delete_store}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(StoresList);
