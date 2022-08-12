import { Grid, Row, Col } from "rsuite";
import Chat from "../../component/Chat";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Newuser from "../../component/Newuser";
import Sellingproduct from "../../component/Sellingproduct";
import Footer from "../../component/Layout/DefaultLayout/Footer";

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
            <Col xs={8}>
              <Newuser />
            </Col>
          </div>
          <div className={cx("product")}>
            <Col xs={16}>
              <Sellingproduct />
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

export default Home;
