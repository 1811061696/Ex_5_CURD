import { PRODUCT_SELLING } from "../../Data";

import classNames from "classnames/bind";
import styles from "./Sellingproduct.module.scss";

const cx = classNames.bind(styles);

function Sellingproduct() {
  return (
    <div className={cx("product_selling")}>
      <h1 className={cx("product_selling_title")}>Sản phẩm bán chạy</h1>
      <ul className={cx("product_selling_list")}>
        {PRODUCT_SELLING.map((item, index) => {
          return (
            <li key={index}>
              <div>
                <h2>{item.productName}</h2>
                <p>{item.productId}</p>
              </div>
              <div className={cx("product_sale")}>
                <p className={cx("product_sale_amount")}>{item.sales}</p>
                <p className={cx("product_sale_title")}>sales</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sellingproduct;
