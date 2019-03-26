import React from "react";
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

class ProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      formVisibility: 'hidden',
      name: '',
      price: '',
      store_id: '',
      id: ''
    };

    this.show_add_product_form = this.show_add_product_form.bind(this);
    this.show_edit_product_form = this.show_edit_product_form.bind(this);
    this.close_add_product_form = this.close_add_product_form.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeStore_id = this.changeStore_id.bind(this);
    this.add_product = this.add_product.bind(this);
    this.edit_product = this.edit_product.bind(this);
    this.delete_product = this.delete_product.bind(this);

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


  delete_product(id){
    const old_products = this.state.products;
    var products = [];
    id = parseInt(id);
    for (var i = 0; i < old_products.length; i++){
      if(old_products[i].id !== id){
        products.push(old_products[i]);
      }
    }
    this.setState({products: products});
    SOCKET.emit('delete_product', id)
  }

  changeStore_id(e){
    this.setState({store_id: e.target.value})
  }

  changeName(e){
    this.setState({name: e.target.value})
  }

  changePrice(e){
    this.setState({price: e.target.value})
  }

  show_edit_product_form(id){
    var products = this.state.products;
    var product;
    for (var i=0; i < products.length; i++){
      if(products[i]['id'] === parseInt(id)){
        product = products[i];
        break;
      }
    }

    if (product){
      this.setState({
        mode: 'edit',
        name: product.name,
        price: product.price,
        store_id: product.store_id,
        id: product.id,
        formVisibility: 'visible'
      });
    }
  }

  edit_product(){
    const id = this.state.id;
    const name = this.state.name;
    const price = this.state.price;
    const store_id = this.state.store_id;
    var products = this.state.products;

    var product;

    for (var i=0; i < products.length; i++){
      if(products[i]['id'] === parseInt(id)){
        product = products.splice(i, 1)[0]
      }
    }

    if(product){
      product.name = name;
      product.price = price;
      product.store_id = store_id;

      products.unshift(product);
      this.setState({
        products: products,
        mode: '',
        name: "",
        price: "",
        store_id: "",
        id: '',
        formVisibility: 'hidden'
      })

      SOCKET.emit('edit_product', product);
    }
  }

  show_add_product_form(){
    this.setState({
      mode: 'add',
      formVisibility: 'visible'
    });
  }

  close_add_product_form(){
    this.setState({
      mode: '',
      name: "",
      price: "",
      store_id: "",
      id: '',
      formVisibility: 'hidden'
    });
  }

  add_product(){
    const name = this.state.name;
    const price = this.state.price;
    const store_id = this.state.store_id;
    var products = this.state.products;
    var id = 0;
    for(var i = 0; i < products.length; i++){
      if(products[i]['id'] > id){
        id = products[i]['id'];
      }
    }
    const product = {
      id: id + 1,
      name: name,
      price: price,
      store_id: store_id
    }

    products.unshift(product);
    this.setState({
      products: products,
      mode: '',
      name: "",
      price: "",
      store_id: "",
      id: '',
      formVisibility: 'hidden'
    })

    SOCKET.emit('add_product', product);
  }

  render(){
    const { classes } = this.props;
    const products = this.state.products.map((product) => {
      return(
        [product.id.toString(), product.name, product.price.toString(),
            product.store_id.toString(), 'd', 'e']
      )
    })
    return (
      <div>
        <div>
          <button type="button" className="btn btn-info" onClick={this.show_add_product_form}>Add</button><br/>
          <div style={{visibility: this.state.formVisibility}}>
            <div className="form-row">
              <div className="col">
                <input type="text" className="form-control" placeholder="name" onChange={this.changeName} value={this.state.name}/>
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="price" onChange={this.changePrice} value={this.state.price}/>
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="store_id" onChange={this.changeStore_id} value={this.state.store_id}/>
              </div>
              <div className='col'>
                <button onClick={this.state.mode === 'edit' ?this.edit_product : this.add_product}><i className="fa fa-check" aria-hidden="true"></i></button>
                <button onClick={this.close_add_product_form}><i className="fa fa-close" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
        </div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Products Tabel</h4>
                <p className={classes.cardCategoryWhite}>
                  Here is a list of all aveliable products.
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["id", "name", "price", "store id"]}
                  tableData={products}
                  edit={this.show_edit_product_form}
                  delete={this.delete_product}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(ProductsList);
