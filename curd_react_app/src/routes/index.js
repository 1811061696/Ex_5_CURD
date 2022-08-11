import Home from "../page/Home";
import Product from "../page/Product";
import User from "../page/User";
import Order from "../page/Order";
import Error from "../page/Error";


const publicRoutes = [
  { path: "/", component: Home },
  { path: "/product", component: Product },
  { path: "/user", component: User },
  { path: "/order", component: Order },
  { path: "/error", component: Error, layout:null },
];

export { publicRoutes };
