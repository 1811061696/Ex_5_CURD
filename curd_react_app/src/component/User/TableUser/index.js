import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button, Icon, Input, InputGroup } from "rsuite";
import { getUser } from "../../../Api/ApiUser";
import AddUser from "../AddUser";
import FillterUser from "../FillterUser";
import Paghination from "../Pagination";
import styles from "./TableUser.module.scss";

const cx = classNames.bind(styles);


function Tableuser() {
  const [arrayUser, setArrayUser] = useState([]);
  const [showFilter, setShowFillter] = useState(false);

  useEffect(() => {
    let change = true;
    getUser().then((items) => {
      if (change) {
        setArrayUser(items.reverse());
      }
    });
    return () => (change = false);
  }, []);

  function getDataUser(data) {
    window.location.reload()
    if (data) return setArrayUser([...arrayUser, data]);
  }

   // sử lý xóa user
   function deleteUser(id) {
    const newUser = arrayUser.filter((item) => {
      return item.id !== id;
    });
    setArrayUser(newUser);
  }

  // update user
  function updateUser(value, id) {
    const newUser = {...value, id: id}
    const newArrUser = arrayUser.map((item) => {
      if (item.id === id) {
        return (item = newUser);
      }
      return item;
    });
    setArrayUser(newArrUser);
  }

  function getDataFillterUser(data) {
    console.log(data);
    if (data) return setArrayUser(data);
  }

  function handleShowFilter(e) {
    if (e.target.innerText === "Bộ lọc") {
      e.target.innerText = "Ẩn bộ lọc";
      setShowFillter(true);
    } else if (e.target.innerText === "Ẩn bộ lọc") {
      e.target.innerText = "Bộ lọc";
      window.location.reload()
      setShowFillter(false);
    }
  }

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("wrapper_title")}>Danh sách khách hàng</h1>
      <div className={cx("wrapper_option")}>
        <div className="search_group">
          <InputGroup>
            <Input style={{ width: 350 }} />
            <InputGroup.Addon>
              <Icon icon="search" className={cx("search_icon")} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        <div className={cx("search_group_option")}>
          <div>
            <AddUser onGetdata={getDataUser} />
          </div>
          <Button
            appearance="default"
            className={cx("button_default")}
            onClick={handleShowFilter}
            style={{ color: "#1C64F2" }}
          >
            Bộ lọc
          </Button>
        </div>
      </div>
      {showFilter === true ? (
        <FillterUser data={arrayUser} onGetdata={getDataFillterUser} />
      ) : (
        ""
      )}
      <div className={cx("table_product_table")}>
        <table className={cx("table")}>
          <thead>
            <tr className={cx("background__table")}>
              <td>Họ tên</td>
              <td>Số điện thoại</td>
              <td>Ngày sinh</td>
              <td>Địa chỉ</td>
              <td>Email</td>
              <td>Chức năng</td>
            </tr>
          </thead>
        </table>
      </div>

      {/* paghination */}
      <Paghination data={[...arrayUser]} handleUpdate={updateUser} handleDelete={deleteUser} />
    </div>
  );
}

export default Tableuser;
