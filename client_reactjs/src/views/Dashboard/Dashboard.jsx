import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import AccessTime from "@material-ui/icons/AccessTime";
import Customers from "@material-ui/icons/People";
import Order from "@material-ui/icons/AssignmentTurnedIn"
import Product from "@material-ui/icons/ShoppingBasketSharp";
import Money from "@material-ui/icons/MoneyTwoTone";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import {SOCKET} from "../../index";

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      customers: 0,
      stores: 0,
      products: 0,
      orders: 0,
      income: ''
    };

    SOCKET.on('dashboard_info', (data)=>{
      this.setState(data);
    })
  }

  componentWillUnmount() {
    SOCKET.removeListener('dashboard_info');
  }

  componentWillMount(){
    SOCKET.emit('get_dashboard_info');
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const data = this.state;
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Customers />
                </CardIcon>
                <p className={classes.cardCategory}>Customers</p>
                <h3 className={classes.cardTitle}>{data.customers}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Order />
                </CardIcon>
                <p className={classes.cardCategory}>Orders</p>
                <h3 className={classes.cardTitle}>
                  {data.orders}</h3>
              </CardHeader>
              <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Today
              </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Stores</p>
                <h3 className={classes.cardTitle}>{data.stores}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  This month
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="rose">
                  <Product />
                </CardIcon>
                <p className={classes.cardCategory}>Products</p>
                <h3 className={classes.cardTitle}>{data.products}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  This month
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Money />
                </CardIcon>
                <p className={classes.cardCategory}>Income</p>
                <h3 className={classes.cardTitle}>{data.income}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  This month
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Canceled orders</p>
                <h3 className={classes.cardTitle}>12</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  This month
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>


        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily orders</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily incomes</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 23%
                  </span>{" "}
                  increase in today incomes.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 2 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily registrations</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.dangerText}>
                    <ArrowDownward className={classes.upArrowCardCategory} /> 82%
                  </span>{" "}
                  decrease in today registrations.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
