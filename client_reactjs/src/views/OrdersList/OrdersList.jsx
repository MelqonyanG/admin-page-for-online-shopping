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

class OrdersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      customer_id: '',
      product_id: '',
      date: '',
      id: '',
      formVisibility: 'hidden'
    };

    this.show_add_order_form = this.show_add_order_form.bind(this);
    this.show_edit_order_form = this.show_edit_order_form.bind(this);
    this.close_add_order_form = this.close_add_order_form.bind(this);
    this.changeCustomer = this.changeCustomer.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.add_order = this.add_order.bind(this);
    this.edit_order = this.edit_order.bind(this);
    this.delete_order = this.delete_order.bind(this);

    SOCKET.on('orders_list', (data)=>{
      this.setState({orders: data})
    })
  }

  componentWillMount(){
    SOCKET.emit('get_orders_list')
  }

  componentWillUnmount(){
    SOCKET.removeListener('orders_list');
  }

  delete_order(id){
    const old_orders = this.state.orders;
    var orders = [];
    id = parseInt(id);
    for (var i = 0; i < old_orders.length; i++){
      if(old_orders[i].id !== id){
        orders.push(old_orders[i]);
      }
    }
    this.setState({orders: orders});
    SOCKET.emit('delete_order', id)
  }

  changeCustomer(e){
    this.setState({customer_id: e.target.value})
  }

  changeProduct(e){
    this.setState({product_id: e.target.value})
  }

  changeDate(e){
    this.setState({date: e.target.value})
  }

  show_edit_order_form(id){
    var orders = this.state.orders;
    var order;
    for (var i=0; i < orders.length; i++){
      if(orders[i]['id'] === parseInt(id)){
        order = orders[i];
        break;
      }
    }

    if (order){
      this.setState({
        mode: 'edit',
        customer_id: order.customer_id,
        product_id: order.product_id,
        date: order.date,
        id: order.id,
        formVisibility: 'visible'
      });
    }
  }

  edit_order(){
    const id = this.state.id;
    const customer = this.state.customer_id;
    const product = this.state.product_id;
    const date = this.state.date;
    var orders = this.state.orders;

    var order;

    for (var i=0; i < orders.length; i++){
      if(orders[i]['id'] === parseInt(id)){
        order = orders.splice(i, 1)[0]
      }
    }

    if(order){
      order.customer_id = customer;
      order.product_id = product;
      order.date = date;

      orders.unshift(order);
      this.setState({
        orders: orders,
        mode: '',
        id: '',
        customer_id: "",
        product_id: "",
        date: "",
        formVisibility: 'hidden'
      })

      SOCKET.emit('edit_order', order);
    }
  }

  show_add_order_form(){
    this.setState({
      mode: 'add',
      formVisibility: 'visible'
    });
  }

  close_add_order_form(){
    this.setState({
      id: '',
      customer_id: "",
      product_id: "",
      date: "",
      formVisibility: 'hidden'
    });
  }

  add_order(){
    const customer = this.state.customer_id;
    const product = this.state.product_id;
    const date = this.state.date;
    var orders = this.state.orders;
    var id = 0;
    for(var i = 0; i < orders.length; i++){
      if(orders[i]['id'] > id){
        id = orders[i]['id'];
      }
    }
    const order = {
      id: id + 1,
      customer_id: customer,
      product_id: product,
      date: date
    }

    orders.unshift(order);
    this.setState({
      orders: orders,
      mode: '',
      id: '',
      customer_id: "",
      product_id: "",
      date: "",
      formVisibility: 'hidden'
    })

    SOCKET.emit('add_order', order);
  }

  render(){
    const { classes } = this.props;
    const orders = this.state.orders.map((order) => {
      return(
        [order.id.toString(), order.customer_id.toString(), order.product_id.toString(),
            order.date, 'd', 'e']
      )
    })
    return (
      <div>
        <div>
          <button type="button" className="btn btn-info" onClick={this.show_add_order_form}>Add</button><br/>
          <div style={{visibility: this.state.formVisibility}}>
            <div className="form-row">
              <div className="col">
                <input type="text" className="form-control" placeholder="customer" onChange={this.changeCustomer} value={this.state.customer_id}/>
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="product" onChange={this.changeProduct} value={this.state.product_id}/>
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="date" onChange={this.changeDate} value={this.state.date}/>
              </div>
              <div className='col'>
                <button onClick={this.state.mode === 'edit' ?this.edit_order : this.add_order}><i className="fa fa-check" aria-hidden="true"></i></button>
                <button onClick={this.close_add_order_form}><i className="fa fa-close" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
        </div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Orders Tabel</h4>
                <p className={classes.cardCategoryWhite}>
                  Here is a list of all aveliable Orders
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["id", "customer", "product", "date"]}
                  tableData={orders}
                  edit={this.show_edit_order_form}
                  delete={this.delete_order}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(OrdersList);
