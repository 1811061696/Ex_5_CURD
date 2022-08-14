import { Modal, Placeholder, Button, ButtonToolbar } from "rsuite";

import classNames from "classnames/bind";
import styles from "./Adduser.module.scss";
import { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { getCity, getDistrist } from "../../../Api/Apiaddress";
import { createUser } from "../../../Api/ApiUser";

const cx = classNames.bind(styles);

// lấy ra tên hoặc id của tỉnh/ thành phố
const getIdCity = (arrConscious, conscious) => {
  if (conscious)
    return arrConscious.find(
      (item) => item.name === conscious || item.code === conscious
    );
  else return { code: 1 };
};

function AddUser(props) {
  let codeCity;
  const [arrCity, setArrayCity] = useState([]); // data thành phố
  const [arrDistrist, setArrayDistrist] = useState([]); // data quận huyện
  const [valueCity, setValueCity] = useState(); // value thành phố
  const [valueDistrist, setValueDistrist] = useState(); // value quận/huyện

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

  // gọi Api và gửi đi data muốn push
  const onSubmit = async (values) => {
    let arrCityUser = getIdCity(arrCity, values.valueCity);

    let idDitrisct = getIdCity(arrDistrist, values.address);

    // khi không có values.valueCity  thì mặc định sẽ lấy thái bình
    if (!values.valueCity) {
      values.valueCity = "Thái Bình";
    }
    let newCity = values.valueCity.replace(/[0-9]/g, "");

    // data gửi đi
    let newValue = {
      ...values,
      valueCity: newCity,
      codeCity: arrCityUser.code,
      codeDistrict: idDitrisct.code,
    };
    console.log(newValue);

    // gọi Api post user và truyền đi data
    await createUser(newValue);
    props.onGetdata(newValue); // render lại table
  };

  // bật tắt module
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // handle valid
  const handleValid = (e) => {
    if (e.target.value.length > 0) {
      console.log(e.target.parentElement.children());
    }
  };

  return (
    <div className="modal-container">
      <ButtonToolbar>
        <Button appearance="primary" onClick={() => handleOpen()}>
          Thêm mới
        </Button>
      </ButtonToolbar>
      <Modal full show={open} sonHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Thêm mới khách hàng</Modal.Title>
        </Modal.Header>

        <Modal.Body className={cx("modal_body")}>
          <Placeholder.Graph rows={8}>
            <Form
              onSubmit={onSubmit}
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
                            onBlur={handleValid}
                          />
                          <span className={cx("input_lable")}>Họ và tên</span>
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
                          <span className={cx("input_lable")}>SDT</span>
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
                          <span className={cx("input_lable")}>Email</span>
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

export default AddUser;
