import { Link } from "react-router-dom";
import { Icon } from "rsuite";
import config from "../../../../config";

import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("footer")}>
      <div className={cx("footer_title")}>
        <Link to={config.routes.home} classNam={cx("footer_link")}>© 2022 VnSolution. All rights reserved.</Link>
      </div>
      <div >
        <ul className={cx("footer_option")}>
            <li>
                <a href="https://www.facebook.com/">
                    <Icon  icon="facebook-square" className={cx("footer_icon")}/>
                </a>
            </li>
            <li>
                <a href="https://twitter.com/?lang=vi">
                    <Icon  icon="twitter-square" className={cx("footer_icon")}/>
                </a>
            </li>
            <li>
                <a href="https://github.com/">
                    <Icon  icon="github" className={cx("footer_icon")}/>
                </a>
            </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
