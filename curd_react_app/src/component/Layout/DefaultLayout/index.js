import Header from "./Header";
import Sidebar from "./Sidebar";

import { Grid, Row, Col } from "rsuite";

import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {

  return (
    <div>
      <Header />
      <div className={cx("container")}>
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={4}>
              <Sidebar />
            </Col>
            <Col xs={20}>
              <div className={cx("content")}>{children}</div>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}

export default DefaultLayout;
