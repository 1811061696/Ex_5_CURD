import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Grid, Row, Col, Icon } from "rsuite";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Sidebar from "../Sidebar";
import { useState } from "react";
const cx = classNames.bind(styles);

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showIconMenu, setShowIconMenu] = useState(false)
  const handleOpenSidebar = () => {
    console.log(showSidebar);
    setShowSidebar(!showSidebar);
  };

  window.addEventListener('resize', function(event){
    if(window.innerWidth < 990){
      setShowIconMenu(true)
    }
    else{
      setShowIconMenu(false)
    }
  });
  
// console.log(window.innerWidth)
  return (
    <header className={cx("header")}>
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={12} style={{ display: "flex" }}>
            <h1 className={cx("header__title")}>CRUD</h1>
            { (showIconMenu === true) ?
              <Icon
              style={{ marginTop: 10, marginLeft: 8}}
              onClick={handleOpenSidebar}
              icon="bars"
            >
              {
                (showSidebar === true)? <Sidebar /> : ""
              }
              
            </Icon>
            : ""
            }
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
