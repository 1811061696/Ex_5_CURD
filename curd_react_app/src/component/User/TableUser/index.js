import classNames from "classnames/bind";
import { Grid, Row, Col } from "rsuite";
import { useEffect, useState } from "react";
import { Icon, Input, InputGroup } from "rsuite";
import { getUser } from "../../../Api/ApiUser";
import AddUser from "../AddUser";
import FillterUser from "../FillterUser";
import Paghination from "../Pagination";
import styles from "./TableUser.module.scss";

const cx = classNames.bind(styles);



function Tableuser() {
  const [arrayUser, setArrayUser] = useState([]);
  const [userSearch, setUserSearch] = useState([]);

  useEffect(() => {
    let change = true;
    getUser().then((items) => {
      if (change) {
        setArrayUser(items.reverse());
        setUserSearch(items);
      }
    });
    return () => (change = false);
  }, []);

  function getDataUser(data) {
    window.location.reload();
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
    const newUser = { ...value, id: id };
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

  const getValueSearch = (value) => {
    const valueSearch = value;
    const arraySearch = userSearch.filter((value) => {
      return (
        value.name.toUpperCase().includes(valueSearch.toUpperCase()) ||
        value.phone.toUpperCase().includes(valueSearch.toUpperCase())
      );
    });
    if (arraySearch.length !== 0) {
      setArrayUser(arraySearch);
    } else {
      setArrayUser([{ name: "Không có khách hàng phù hợp!!!" }]);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("wrapper_title")}>Danh sách khách hàng</h1>
      <div className={cx("wrapper_option")}>
        <div className="search_group">
          <InputGroup>
            <Input style={{ width: 350 }} onChange={getValueSearch} />
            <InputGroup.Addon>
              <Icon icon="search" className={cx("search_icon")} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        <div className={cx("search_group_option")}>
          <div>
            <AddUser onGetdata={getDataUser}  data={[...arrayUser]}/>
          </div>
          <FillterUser data={arrayUser} onGetdata={getDataFillterUser} />
        </div>
      </div>
      <div className={cx("table_product_table")} >
        {/* paghination */}
        <Grid fluid >
          <Row className="show-grid">
            <Col xs={24} >
              <Paghination
                data={[...arrayUser]}
                handleUpdate={updateUser}
                handleDelete={deleteUser}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}

export default Tableuser;
