import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Grid, Row, Col } from "rsuite";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("header")}>
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={12}>
            <h1 className={cx("header__title")}>CURD</h1>
          </Col>
          <Col xs={12}>
            <div className={cx("header__information")}>
              <FontAwesomeIcon icon={faBell} className={cx("bell_icon")} />
              <img
                src="https://png.pngtree.com/png-vector/20201009/ourlarge/pngtree-svg-cartoon-cute-pair-of-owls-png-image_2355184.jpg"
                alt=""
              />
            </div>
          </Col>
        </Row>
      </Grid>
    </header>
  );
}

export default Header;
