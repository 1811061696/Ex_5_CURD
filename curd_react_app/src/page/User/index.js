import { Col, Grid, Row } from "rsuite";
import Footer from "../../component/Layout/DefaultLayout/Footer";

import classNames from "classnames/bind";
import styles from "./User.module.scss";
import Tableuser from "../../component/User/TableUser";

const cx = classNames.bind(styles);

function User() {
  return (
    <div className={cx("user")}>
      <Grid fluid>
        <Row className="show-grid">
          <div className={cx("user_container")}>
            <Col xs={24}>
              <Tableuser />
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

export default User;
