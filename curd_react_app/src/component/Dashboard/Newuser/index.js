import { NEW_USER } from "../../Data";

import classNames from "classnames/bind";
import styles from "./Newuser.module.scss";

const cx = classNames.bind(styles);

function Newuser() {
  return (
    <div className={cx("new_user")}>
      <h1 className={cx("new_user_title")}>Khách hàng mới</h1>
      <ul className={cx("new_user_list")}>
        {NEW_USER.map((item, index) => {
          return (
            <li key={index}> 
              <img src={item.img} alt={item.userName}/>
              <div>
                <h2>{item.userName}</h2>
                <p>{item.email}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Newuser;
