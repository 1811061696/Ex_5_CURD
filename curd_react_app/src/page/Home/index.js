import { Grid, Row, Col } from "rsuite";
import Chat from "../../component/Dashboard/Chat";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Newuser from "../../component/Dashboard/Newuser";
import Sellingproduct from "../../component/Dashboard/Sellingproduct";
import Footer from "../../component/Layout/DefaultLayout/Footer";
import Nearestorder from "../../component/Dashboard/Nearestorder";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("container")}>
      <Grid fluid>
        <Row className="show-grid">
          <div className={cx("chat")}>
            <Col xs={24}>
              <Chat />
            </Col>
          </div>
        </Row>

        <Row className="show-grid">
          <div className={cx("new_user")}>
            <Col md={8} sm={24} xs={24}  style={{marginBottom: 16}}>
              <Newuser />
            </Col>
          </div>
          <div className={cx("product")}>
            <Col md={16} sm={24} xs={24}>
              <Sellingproduct />
            </Col>
          </div>
        </Row>

        <Row className="show-grid">
          <Col xs={24}>
            <Nearestorder />
          </Col>
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

export default Home;
