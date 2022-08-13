import classNames from "classnames/bind";
import { DATA_TABLE } from "../../Data";
import styles from "./Nearestorder.scss";

const cx = classNames.bind(styles);

console.log(DATA_TABLE);

function Nearestorder() {
  return (
    <div className={cx("order_nearestor")}>
      <h1 className={cx("order_nearestor_title")}>Đơn hàng gần nhất</h1>
      <p className={cx("order_nearestor_text")}>
        Danh sách 6 đơn hàng gần nhất
      </p>

      <div className={cx("order_nearestor_table")}>
        <table class="table">
          <thead>
            <tr class="background__table">
              <td>Khách hàng</td>
              <td>Thời gian</td>
              <td>Thành tiền</td>
              <td>Trạng thái</td>
            </tr>
          </thead>
          <tbody class="list__table">
            {DATA_TABLE.map((item, index) => {
              return (
                <tr className={item.background} >
                  <td className={cx("text_color")}>{item.name}</td>
                  <td>{item.date}</td>
                  <td className={cx("text_color")}>{item.price}</td>
                  <td>
                    <p className={item.Class}>{item.status}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Nearestorder;
