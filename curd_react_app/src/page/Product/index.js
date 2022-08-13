import Footer from "../../component/Layout/DefaultLayout/Footer";
import TableProduct from "../../component/Product/Tableproduct";
import { Col, Grid, Row } from "rsuite";

import classNames from "classnames/bind";
import styles from "./Product.module.scss";

const cx = classNames.bind(styles);

function Product() {
  return (
    <div>
      <Grid fluid>
        <Row className="show-grid">
          <div className={cx("Product_container")}>
            <Col xs={24}>
              <TableProduct />
            </Col>
          </div>
        </Row>
        <Row className="show-grid">
          <Col xs={24}>
            <Footer />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Product;
