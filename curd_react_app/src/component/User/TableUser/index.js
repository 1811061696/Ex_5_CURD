import classNames from "classnames/bind";
import styles from "./TableUser.module.scss";
import { Input, InputGroup, Icon, Button } from "rsuite";
import { useEffect, useState } from "react";
import { getUser } from "../../../Api/ApiUser";
import AddUser from "../AddUser";

const cx = classNames.bind(styles);

function Tableuser() {
  const [arrayUser, setArrayUser] = useState([]);
  useEffect(() => {
    let change = true;
    getUser().then((items) => {
      if (change) {
        setArrayUser(items);
      }
    });
    return () => (change = false);
  }, []);

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("wrapper_title")}>Danh sách khách hàng</h1>
      <div className={cx("wrapper_option")}>
        <div className="search_group">
          <InputGroup>
            <Input style={{ width: 350 }} />
            <InputGroup.Addon>
              <Icon icon="search" className={cx("search_icon")} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        <div className={cx("search_group_option")}>
          <div>
            <AddUser />
          </div>
          <Button appearance="default" className={cx("button_default")}>Bộ lọc</Button>
        </div>
      </div>
      <div className={cx("table_product_table")}>
        <table className={cx("table")}>
          <thead>
            <tr className={cx("background__table")}>
              <td>Họ tên</td>
              <td>Số điện thoại</td>
              <td>Ngày sinh</td>
              <td>Địa chỉ</td>
              <td>Email</td>
              <td>Chức năng</td>
            </tr>
          </thead>
          <tbody className={cx("list__table")}>
            {arrayUser.reverse().map((item, index) => {
              if (index % 2 === 0) {
                return (
                  <tr key={index}>
                    <td className={cx("text_color")}>{item.name}</td>
                    <td className={cx("text_color")}>{item.phone}</td>
                    <td>{item.date}</td>
                    <td className={cx("text_color")}>{item.address}</td>
                    <td className={cx("text_color")}>{item.email}</td>
                    <td className={cx("text_color")}>
                      <div className={cx("table_option")}>
                        <Icon icon="pencil" className={cx("update")} />
                        <Icon icon="trash" className={cx("delete")} />
                      </div>
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={index} className={cx("background__table")}>
                    <td className={cx("text_color")}>{item.name}</td>
                    <td className={cx("text_color")}>{item.phone}</td>
                    <td>{item.date}</td>
                    <td className={cx("text_color")}>{item.address}</td>
                    <td className={cx("text_color")}>{item.email}</td>
                    <td className={cx("text_color")}>
                      <div className={cx("table_option")}>
                        <Icon icon="pencil" className={cx("update")} />
                        <Icon icon="trash" className={cx("delete")} />
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>

      <div className={cx("pagination")}>
        <div className={cx("pagination_title")}>
          <span>Số bản ghi</span>
          <select aria-label="State" className={cx("paging_option")}>
            <option defaultValue={"10"}>10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div className={cx("pagination_status")}>1-10 of 20</div>
        <div>
          <Icon icon="arrow-left-line" className={cx("arrow-left-line")} />
          <Icon icon="arrow-right-line" className={cx("arrow-right-line")} />
        </div>
      </div>
    </div>
  );
}

export default Tableuser;
