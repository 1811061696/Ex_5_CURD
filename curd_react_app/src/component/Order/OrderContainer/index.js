import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Grid, Icon, Input, InputGroup, Row } from "rsuite";
import { getOrder } from "../../../Api/ApiOrder";
import PaginationOrder from "../../Order/PaginationOrder";
import AddOrder from "../AddOrder";
import FillterOrder from "../FillterOrder";
import styles from "./OrderContainer.module.scss";

const cx = classNames.bind(styles);

function OrderContainer() {
  const [arrayOrder, setArrayOrder] = useState([]);
  const [orderSearch, setOrderSearch] = useState([]);

  useEffect(() => {
    let change = true;
    getOrder().then((items) => {
      if (change) {
        setArrayOrder(items.reverse());
        setOrderSearch(items);
      }
    });
    return () => (change = false);
  }, []);

  function getDataOrder(data) {
    window.location.reload();
    if (data) return setArrayOrder([...arrayOrder, data]);
  }

  // sử lý xóa order
  function deleteOrder(id) {
    const newUser = arrayOrder.filter((item) => {
      return item.id !== id;
    });
    setArrayOrder(newUser);
  }

  // update user
  function updateOrder(value, id) {
    const newUser = { ...value, id: id };
    const newArrUser = arrayOrder.map((item) => {
      if (item.id === id) {
        return (item = newUser);
      }
      return item;
    });
    setArrayOrder(newArrUser);
  }

  function getDataFillterOrder(data) {
    console.log(data);
    if (data) return setArrayOrder(data);
  }

  const getValueSearch = (value) => {
    console.log(value);
    const valueSearch = value;
    const arraySearch = orderSearch.filter((value) => {
      return (
        value.productName.toUpperCase().includes(valueSearch.toUpperCase()) ||
        value.phone.toUpperCase().includes(valueSearch.toUpperCase()) ||
        value.userName.toUpperCase().includes(valueSearch.toUpperCase())
      );
    });
    console.log(arraySearch);
    if (arraySearch.length !== 0) {
      setArrayOrder(arraySearch);
    } else {
      setArrayOrder([{ name: "Không có khách hàng phù hợp!!!" }]);
    }
  };
  return (
    <div className={cx("order_container_wrapper")}>
      <h1 className={cx("oredr_title")}>Danh sách đơn đặt hàng</h1>
      <div className={cx("option")}>
        <div className="search_group">
          <InputGroup>
            <Input style={{ width: 350 }} onChange={getValueSearch} />
            <InputGroup.Addon>
              <Icon icon="search" className={cx("search_icon")} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        <div className={cx("search_group_option")}>
          <div>
            <AddOrder onGetdata={getDataOrder} data={[...arrayOrder]} />
          </div>
          <FillterOrder data={arrayOrder} onGetdata={getDataFillterOrder} />
        </div>
      </div>
      <div className={cx("table_product_table")}>
        {/* paghination */}
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={24}>
              <PaginationOrder
                data={[...arrayOrder]}
                handleUpdate={updateOrder}
                handleDelete={deleteOrder}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}

export default OrderContainer;
