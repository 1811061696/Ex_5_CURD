import { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { Button, Icon, Modal, Placeholder } from "rsuite";

import classNames from "classnames/bind";
import { getCity, getDistrist } from "../../../Api/Apiaddress";
import { getOneUser, handleUpdateUser } from "../../../Api/ApiUser";
import { getIdCity } from "../AddUser";
import styles from "./UpdateUser.module.scss";
const cx = classNames.bind(styles);

function UpdateUser(props) {
  const id = props.id;
  const [user, setUser] = useState([]);
  const [arrCity, setArrayCity] = useState([]); // data thành phố
  const [arrDistrist, setArrayDistrist] = useState([]); // data quận huyện
  const [valueCity, setValueCity] = useState(); // value thành phố
  const [valueDistrist, setValueDistrist] = useState(); // value quận/huyện
  let codeCity = user.codeCity;

  // get user
  useEffect(() => {
    getOneUser(id).then((item) => {
      setUser(item);
    });
  }, []);

  // khi có value của thành phố
  if (valueCity) {
    var res = getIdCity(arrCity, valueCity); // object của thành phố
    codeCity = parseInt(res.code); // id của thành phố
  } else {
    codeCity = 1;
  }

  // gọ Api lấy các thành phố, quận, huyện
  useEffect(() => {
    const fetchApi = async () => {
      try {
        // lấy các tỉnh, thành phố
        const resCityService = await getCity();
        setArrayCity(resCityService);

        // nếu có Id của tỉnh, thành phố thì lấy các quận/ huyện có trong thành phố
        if (codeCity) {
          const resDisService = await getDistrist(codeCity);
          setArrayDistrist(resDisService.districts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [codeCity]);

  // handle updates
  const onSubmit = async (values) => {
    await handleUpdateUser(values, props.id);
    props.updateUser(values, id);
  };

  // bật tắt module
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div className={cx("update_container")}>
      <Icon
        icon="pencil"
        onClick={() => handleOpen()}
        className={cx("update_icon")}
      />
      <Modal full show={open} sonHide={handleClose}>
        <Modal.Header onClick={() => handleClose()}>
          <Modal.Title>Cập nhập khách hàng</Modal.Title>
        </Modal.Header>

        <Modal.Body className={cx("modal_body")}>
          <Placeholder.Graph rows={8}>
            <Form
              onSubmit={onSubmit}
              initialValues={{
                name: user.name,
                phone: user.phone,
                date: user.date,
                address: user.address,
                city: user.city,
                email: user.email,
              }}
              render={({ handleSubmit, submitting, pristine }) => (
                <form onSubmit={handleSubmit}>
                  <div className={cx("modal_input")}>
                    <div className={cx("model_input_doble")}>
                      <div className={cx("input_wrapper")}>
                        <div>
                          <Field
                            className={cx("input_content")}
                            name="name"
                            component="input"
                            type="text"
                          />
                          <span className={cx("input_lable_select")}>
                            Họ và tên
                          </span>
                        </div>
                      </div>
                      <div className={cx("input_wrapper")}>
                        <div>
                          <Field
                            className={cx("input_content")}
                            name="phone"
                            component="input"
                            type="number"
                          />
                          <span className={cx("input_lable_select")}>SDT</span>
                        </div>
                      </div>
                    </div>

                    <div className={cx("model_input_doble")}>
                      <div className={cx("input_wrapper")}>
                        <div>
                          <Field
                            className={cx("input_content")}
                            name="address"
                            component="select"
                            type="text"
                            initialValue={valueDistrist}
                            onChange={(e) => {
                              setValueDistrist(e.target.value);
                            }}
                          >
                            {arrDistrist &&
                              arrDistrist.map((item) => {
                                return (
                                  <option name={item.code} key={item.code}>
                                    {item.name}
                                  </option>
                                );
                              })}
                          </Field>
                          <span className={cx("input_lable_select")}>
                            Quận/Huyện
                          </span>
                        </div>
                      </div>
                      <div className={cx("input_wrapper")}>
                        <div>
                          <Field
                            className={cx("input_content")}
                            name="valueCity"
                            component="select"
                            type="text"
                            initialValue={valueCity}
                            onChange={(e) => {
                              setValueCity(e.target.value);
                            }}
                          >
                            {arrCity &&
                              arrCity.map((item) => {
                                return (
                                  <option name={item.code} key={item.code}>
                                    {item.name}
                                  </option>
                                );
                              })}
                          </Field>
                          <span className={cx("input_lable_select")}>
                            Thành phố
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={cx("model_input_doble")}>
                      <div className={cx("input_wrapper")}>
                        <div>
                          <Field
                            className={cx("input_content")}
                            name="date"
                            component="input"
                            type="date"
                          />
                          <span className={cx("input_lable_select")}>
                            Ngày sinh
                          </span>
                        </div>
                      </div>
                      <div className={cx("input_wrapper")}>
                        <div>
                          <Field
                            className={cx("input_content")}
                            name="email"
                            component="input"
                            type="text"
                            placeholder="email@gmail.com"
                          />
                          <span className={cx("input_lable_select")}>
                            Email
                          </span>
                        </div>
                      </div>
                    </div>

                    <Modal.Footer>
                      <Button
                        onClick={handleClose}
                        type="submit"
                        disabled={submitting || pristine}
                        appearance="primary"
                      >
                        Lưu lại
                      </Button>
                      <Button onClick={() => handleClose()} appearance="subtle">
                        Hủy
                      </Button>
                    </Modal.Footer>
                  </div>
                </form>
              )}
            />
          </Placeholder.Graph>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateUser;
