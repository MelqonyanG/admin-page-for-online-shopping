import React from "react";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import withStyles from "@material-ui/core/styles/withStyles";

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

class Maps extends React.Component {
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
    const markers = this.state.stores.map((store, idx) => {
      return (<Marker position={{lat: store.lat, lng: store.lng}} key={idx}>
        <Popup>
          <span>{store['address']}</span>
        </Popup>
      </Marker>)
    })
    return (
      <Map center={[40.476, 44.746]} zoom={8}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
            {markers}
          </Map>
    );
  }
}

export default withStyles(styles)(Maps);
