import { Link } from "react-router-dom";
import { Icon } from "rsuite";
import config from "../../../../config";

import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);

function Sidebar() {
  const main = document.getElementById("main");
  const iconMain = document.getElementById("iconMain");
  const product = document.getElementById("product");
  const productIcon = document.getElementById("productIcon");
  const user = document.getElementById("user");
  const userIcon = document.getElementById("userIcon");
  const order = document.getElementById("order");
  const orderIcon = document.getElementById("orderIcon");
  switch (window.location.pathname) {
    case "/":
      if (main) {
        main.style.color = "var(--blue600)";
        iconMain.style.color = "var(--blue600)";

        product.style.color = "var(--gray900)";
        productIcon.style.color = "var(--gray900)";

        user.style.color = "var(--gray900)";
        userIcon.style.color = "var(--gray900)";

        order.style.color = "var(--gray900)";
        orderIcon.style.color = "var(--gray900)";
      }
      break;

    case "/product":
      if (product) {
        product.style.color = "var(--blue600)";
        productIcon.style.color = "var(--blue600)";

        main.style.color = "var(--gray900)";
        iconMain.style.color = "var(--gray900)";

        user.style.color = "var(--gray900)";
        userIcon.style.color = "var(--gray900)";

        order.style.color = "var(--gray900)";
        orderIcon.style.color = "var(--gray900)";
      }
      break;

    case "/user":
      if (user) {
        user.style.color = "var(--blue600)";
        userIcon.style.color = "var(--blue600)";

        main.style.color = "var(--gray900)";
        iconMain.style.color = "var(--gray900)";

        product.style.color = "var(--gray900)";
        productIcon.style.color = "var(--gray900)";

        order.style.color = "var(--gray900)";
        orderIcon.style.color = "var(--gray900)";
      }
      break;

    case "/order":
      if (order) {
        order.style.color = "var(--blue600)";
        orderIcon.style.color = "var(--blue600)";


        main.style.color = "var(--gray900)";
        iconMain.style.color = "var(--gray900)";

        user.style.color = "var(--gray900)";
        userIcon.style.color = "var(--gray900)";

        product.style.color = "var(--gray900)";
        productIcon.style.color = "var(--gray900)";
      }
      break;
    default:
  }

  return (
    <div className={cx("sidebar")}>
      <div className={cx("sidebar__title")}>
        <Icon icon="dashboard" className={cx("sidebar_icon")} id="iconMain" />
        <Link to={config.routes.home} id="main">
          Bảng điều khiển
        </Link>
      </div>
      <ul className={cx("sidebar__list")}>
        <li className={cx("sidebar__list__item")}>
          <Icon
            icon="database"
            className={cx("sidebar_icon")}
            id="productIcon"
          />
          <Link to={config.routes.product} id="product">
            Danh sách sản phẩm
          </Link>
        </li>
        <li className={cx("sidebar__list__item")}>
          <Icon
            icon="user-circle-o"
            className={cx("sidebar_icon")}
            id="userIcon"
          />
          <Link to={config.routes.user} id="user">
            Khách hàng
          </Link>
        </li>
        <li className={cx("sidebar__list__item")}>
          <Icon
            icon="order-form"
            className={cx("sidebar_icon")}
            id="orderIcon"
          />
          <Link to={config.routes.order} id="order">
            Đơn hàng
          </Link>
        </li>
      </ul>
      <button className={cx("sidebar_btn")}>Thu gọn</button>
    </div>
  );
}

export default Sidebar;
