import { Grid, Row, Col } from "rsuite";
import Footer from "../../component/Layout/DefaultLayout/Footer";

import classNames from "classnames/bind";
import styles from "./Order.module.scss";
import OrderContainer from "../../component/Order/OrderContainer";

const cx = classNames.bind(styles);

function Order() {
  return (
    <div className={cx("order_wrapper")}>
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={24}>
            <div className={cx("order_container")}>
              <OrderContainer />
            </div>
          </Col>
          <Col xs={24}>
            <Footer />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Order;
