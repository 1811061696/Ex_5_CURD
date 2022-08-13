import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { getProducts } from "../../../Api/ApiProduct";
import { Input, InputGroup, Icon, Button} from "rsuite";
import styles from "./Tableproduct.module.scss";

const cx = classNames.bind(styles);


function TableProduct() {
  const [arrayProduct, setArrayProduct] = useState([]);
  useEffect(() => {
    let change = true;
    getProducts().then((items) => {
      if (change) {
        setArrayProduct(items);
      }
    });
    return () => (change = false);
  }, []);


  return (
    <div className={cx("table_product")}>
      <h1 className={cx("table_product_title")}>Danh sách sản phẩm</h1>
      <div className={cx("table_product_option")}>
        <div className="search_group">
          <InputGroup>
            <Input style={{ width: 350 }} />
            <InputGroup.Addon>
              <Icon icon="search" className={cx("search_icon")} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        <div className={cx("search_group_option")}>
          <Button appearance="primary" className={cx("button_primary")}>
            Thêm mới
          </Button>
          <Button appearance="default">Bộ lọc</Button>
        </div>
      </div>

      <div className={cx("table_product_table")}>
        <table className={cx("table")}>
          <thead>
            <tr className={cx("background__table")}>
              <td>Sản phẩm</td>
              <td>Loại</td>
              <td>Ngày tạo sản phẩm</td>
              <td>Số lượng</td>
              <td>Giá bán</td>
              <td>Trạng thái</td>
              <td>Chức năng</td>
            </tr>
          </thead>
          <tbody className={cx("list__table")}>
            {arrayProduct.map((item, index) => {
              if (index % 2 === 0) {
                if (item.status === "Còn hàng") {
                  return (
                    <tr key={index}>
                      <td className={cx("text_color")}>{item.name}</td>
                      <td className={cx("text_color")}>{item.type}</td>
                      <td>{item.create_date}</td>
                      <td className={cx("text_color")}>{item.amount}</td>
                      <td className={cx("text_color")}>{item.price}</td>
                      <td>
                        <p className={cx("label-success")}>{item.status}</p>
                      </td>
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
                    <tr key={index}>
                      <td className={cx("text_color")}>{item.name}</td>
                      <td className={cx("text_color")}>{item.type}</td>
                      <td>{item.create_date}</td>
                      <td className={cx("text_color")}>{item.amount}</td>
                      <td className={cx("text_color")}>{item.price}</td>
                      <td>
                        <p className={cx("label-danger")}>{item.status}</p>
                      </td>
                      <td className={cx("text_color")}>
                        <div className={cx("table_option")}>
                          <Icon icon="pencil" className={cx("update")} />
                          <Icon icon="trash" className={cx("delete")} />
                        </div>
                      </td>
                    </tr>
                  );
                }
              } else {
                if (item.status === "Còn hàng") {
                  return (
                    <tr key={index} className={cx("background__table")}>
                      <td className={cx("text_color")}>{item.name}</td>
                      <td className={cx("text_color")}>{item.type}</td>
                      <td>{item.create_date}</td>
                      <td className={cx("text_color")}>{item.amount}</td>
                      <td className={cx("text_color")}>{item.price}</td>
                      <td>
                        <p className={cx("label-success")}>{item.status}</p>
                      </td>
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
                      <td className={cx("text_color")}>{item.type}</td>
                      <td>{item.create_date}</td>
                      <td className={cx("text_color")}>{item.amount}</td>
                      <td className={cx("text_color")}>{item.price}</td>
                      <td>
                        <p className={cx("label-danger")}>{item.status}</p>
                      </td>
                      <td className={cx("text_color")}>
                        <div className={cx("table_option")}>
                          <Icon icon="pencil" className={cx("update")} />
                          <Icon icon="trash" className={cx("delete")} />
                        </div>
                      </td>
                    </tr>
                  );
                }
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
            <Icon icon="arrow-right-line"  className={cx("arrow-right-line")}/>
        </div>
      </div>
    </div>
  );
}

export default TableProduct;
