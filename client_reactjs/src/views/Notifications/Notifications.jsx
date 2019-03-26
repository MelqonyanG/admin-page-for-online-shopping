/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
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

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      specific_notifications: 'error'
    };

    this.closeNotification = this.closeNotification.bind(this);

    SOCKET.on('notifications_list', (data)=>{
      this.setState({notifications: data})
    })
  }

  componentWillUnmount() {
    SOCKET.removeListener('notifications_list');
  }

  componentWillMount(){
    SOCKET.emit('get_notifications_list');
  }

  showNotification(place) {
    this.setState({specific_notifications: place})
  }

  closeNotification(id){
    id = parseInt(id);
    const notifs = this.state.notifications;
    var notifications = [];
    for (var i = 0; i<notifs.length; i++ ){
      if (notifs[i]['id'] !== id){
        notifications.push(notifs[i]);
      }
    }
    this.setState({notifications: notifications})
    SOCKET.emit('delete_notification', id)
  }

  render() {
    const { classes } = this.props;
    const notifs = this.state.notifications;
    const notifications = notifs.map((notification, idx) => {
      return(
        <SnackbarContent
          message={notification.message}
          close
          key={idx}
          close_action={this.closeNotification}
          idx={notification['id']}
        />
      )
    });

    var specific_notifications = [];
    const not = this.state.specific_notifications;
    for (var i = 0; i<notifs.length; i++ ){

      if (notifs[i].priority === not){
        specific_notifications.push(
          <SnackbarContent
            message={notifs[i].message}
            close
            color={not === 'error' ? 'danger' : (not === 'warning'? not : 'info')}
            key={i}
            close_action={this.closeNotification}
            idx={notifs[i]['id']}
          />
        );
      }
    }

    return (
      <Card>
        <CardHeader color="info">
          <h4 className={classes.cardTitleWhite}>Notifications</h4>
          <p className={classes.cardCategoryWhite}>
            Recent unprocessed notifications.
          </p>
        </CardHeader>
        <CardBody>
        <GridContainer justify={"center"}>
          <GridItem xs={12} sm={12} md={10} lg={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  fullWidth
                  color="danger"
                  onClick={() => this.showNotification("error")}
                >
                  ERROR
                </Button>
                <Snackbar
                  place="bl"
                  color="info"
                  icon={AddAlert}
                  message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                  open={this.state.bl}
                  closeNotification={() => this.setState({ bl: false })}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  fullWidth
                  color="warning"
                  onClick={() => this.showNotification("warning")}
                >
                  WARNING
                </Button>
                <Snackbar
                  place="bc"
                  color="info"
                  icon={AddAlert}
                  message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                  open={this.state.bc}
                  closeNotification={() => this.setState({ bc: false })}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  fullWidth
                  color="info"
                  onClick={() => this.showNotification("message")}
                >
                  MESSAGE
                </Button>
                <Snackbar
                  place="br"
                  color="info"
                  icon={AddAlert}
                  message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                  open={this.state.br}
                  closeNotification={() => this.setState({ br: false })}
                  close
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <br />
        <br />

          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h5>All</h5>
              <br />
              {notifications}
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
              <h5>{this.state.specific_notifications}</h5>
              <br />
              {specific_notifications}
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(styles)(Notifications);
