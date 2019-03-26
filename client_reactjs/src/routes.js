// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Store from "@material-ui/icons/Store";
import Order from "@material-ui/icons/AssignmentTurnedIn"
import Products from "@material-ui/icons/ShoppingBasketSharp";
import Customers from "@material-ui/icons/People";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Stores from "views/StoresList/StoresList.jsx";
import Orders from "views/OrdersList/OrdersList.jsx";
import Product from "views/ProductsList/ProductsList.jsx";
import Customer from "views/CustomersList/CustomersList.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/stores",
    name: "Stores",
    icon: Store,
    component: Stores,
    layout: "/admin"
  },
  {
    path: "/orders",
    name: "Orders",
    icon: Order,
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/products",
    name: "Products",
    icon: Products,
    component: Product,
    layout: "/admin"
  },
  {
    path: "/customers",
    name: "Customers",
    icon: Customers,
    component: Customer,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  }
];

export default dashboardRoutes;
