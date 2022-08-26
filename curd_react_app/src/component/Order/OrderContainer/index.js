import classNames from "classnames/bind";
import { Icon, Input, InputGroup } from "rsuite";
import AddOrder from '../AddOrder'
import FillterOrder from "../FillterOrder";
import styles from "./OrderContainer.module.scss";

const cx = classNames.bind(styles);

function OrderContainer() {
  return (
    <div className={cx("order_container_wrapper")}>
      <h1 className={cx("oredr_title")}>Danh sách đơn đặt hàng</h1>
      <div className={cx("option")}>
        <div className="search_group">
          <InputGroup>
            <Input style={{ width: 350 }}  />
            <InputGroup.Addon>
              <Icon icon="search" className={cx("search_icon")} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        <div className={cx("search_group_option")}>
          <div>
            <AddOrder />
          </div>
          <FillterOrder  />
        </div>
      </div>
    </div>
  );
}

export default OrderContainer;
