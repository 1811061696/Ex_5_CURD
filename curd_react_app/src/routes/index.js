import config from "../config";

import Home from "../page/Home";
import Product from "../page/Product";
import User from "../page/User";
import Order from "../page/Order";
import Error from "../page/Error";


const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.product, component: Product },
  { path: config.routes.user, component: User },
  { path: config.routes.order, component: Order },
  { path: config.routes.error, component: Error, layout:null },
];

export { publicRoutes };
