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

class CustomersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };

    this.delete_user = this.delete_user.bind(this);

    SOCKET.on('customers_list', (data)=>{
      this.setState({customers: data})
    })
  }

  componentWillMount(){
    SOCKET.emit('get_customers_list')
  }

  componentWillUnmount(){
    SOCKET.removeListener('customers_list');
  }

  delete_user(id){
    const old_customers = this.state.customers;
    var customers = [];
    id = parseInt(id);
    for (var i = 0; i < old_customers.length; i++){
      if(old_customers[i].id !== id){
        customers.push(old_customers[i]);
      }
    }
    this.setState({customers: customers});
    SOCKET.emit('delete_customer', id)
  }

  render(){
    const { classes } = this.props;
    const customers = this.state.customers.map((customer) => {
      return(
        [customer.id.toString(), customer.first_name, customer.last_name, customer.address,
          customer.phone, customer.email, 'd']
      )
    })
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Stores Tabel</h4>
              <p className={classes.cardCategoryWhite}>
                Here is a list of all aveliable products.
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["id", "first name", "last name", "address", "phone", "email"]}
                tableData={customers}
                delete={this.delete_user}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(CustomersList);
