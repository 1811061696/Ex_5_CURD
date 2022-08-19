import { useEffect, useRef, useState } from "react";
import { Field, Form as FieleForm } from "react-final-form";
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  Form as RSForm,
  FormGroup,
  Icon,
  Modal,
} from "rsuite";

import {
  DatePickerCustomField,
  InputCustomField,
  InputPickerCustomField,
} from "../../../FinalFormComponents";

import classNames from "classnames/bind";
import { getCity, getDistrist } from "../../../Api/Apiaddress";
import { getOneUser, handleUpdateUser } from "../../../Api/ApiUser";
import { getIdCity, handleCustomDate } from "../AddUser";
import styles from "./UpdateUser.module.scss";
const cx = classNames.bind(styles);

function UpdateUser(props) {

  const formRef = useRef();
  const id = props.id;
  const [user, setUser] = useState([]);
  const [arrCity, setArrayCity] = useState([]); // data thành phố
  const [arrDistrist, setArrayDistrist] = useState([]); // data quận huyện
  const [valueCity, setValueCity] = useState(); // value thành phố
  let codeCity = user.codeCity;

  // get user
  useEffect(() => {
    getOneUser(id).then((item) => {
      setUser(item);
    });
  }, []);


  // sử lý kiểm tra value của thành phố
  const handleCheckValue = (value) => {
    setValueCity(value);
  };

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
    const date = handleCustomDate(values);

    const newValue = {
      ...values,
      date,
    };

    await handleUpdateUser(newValue, id);
    props.updateUser(newValue, id);
    setUser(newValue)
  };

  // bật tắt module
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //valid
  const required = (value) => (value ? undefined : "Required");

  const handleCheckEmail = (value) => {
    if (value) {
      return /\S+@\S+\.\S+/.test(value)
        ? undefined
        : "Vui lòng nhập đúng Email";
    } else {
      return "Required";
    }
  };

  const handleCheckNumber = (value) => {
    if (value) {
      if (!value.match("[0-9]{14}")) {
        if (!(value.length > 9 && value.length < 12)) {
          return "Vui lòng kiểm tra lại số điện thoại";
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    } else {
      return "Required";
    }
  };

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
          {/* {console.log(user)} */}
          <FieleForm
            onSubmit={onSubmit}
            initialValues={{
              name: user.name,
              phone: user.phone,
              date: user.date,
              address: user.address,
              valueCity: user.valueCity,
              email: user.email,
            }}
            render={({ handleSubmit, values, submitting, pristine }) => (
              <>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
                <RSForm
                  layout="inline"
                  className={cx("modal_input")}
                  onSubmit={handleSubmit}
                  id="form"
                  ref={formRef}
                >
                  <div>
                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_content")}
                          name="name"
                          component={InputCustomField}
                          placeholder=" "
                          validate={required}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Họ và tên
                        </ControlLabel>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_content")}
                          name="phone"
                          component={InputCustomField}
                          placeholder=""
                          validate={handleCheckNumber}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          SĐT
                        </ControlLabel>
                      </div>
                    </FormGroup>
                  </div>

                  {/* ======================================== */}

                  <div>
                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_content")}
                          name="address"
                          component={InputPickerCustomField}
                          inputValue={arrDistrist}
                          valueKey="name"
                          labelKey="name"
                          validate={required}
                          onChange={() => {}}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Quận/Huyện
                        </ControlLabel>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_content")}
                          name="valueCity"
                          component={InputPickerCustomField}
                          inputValue={arrCity}
                          valueKey="name"
                          labelKey="name"
                          validate={required}
                          onChange={(value) => {
                            handleCheckValue(value);
                          }}
                        />

                        <ControlLabel className={cx("input_lable_select")}>
                          Thành phố
                        </ControlLabel>
                      </div>
                    </FormGroup>
                  </div>

                  {/* =============================================== */}

                  <div>
                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_date")}
                          name="date"
                          component={DatePickerCustomField}
                          placeholder=""
                          validate={required}
                          onetap={true}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Ngày sinh
                        </ControlLabel>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_content")}
                          name="email"
                          component={InputCustomField}
                          placeholder=""
                          validate={handleCheckEmail}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Email
                        </ControlLabel>
                      </div>
                    </FormGroup>
                  </div>

                  <ButtonToolbar className={cx("form_footer")}>
                    <Button
                      type="submit"
                      disabled={submitting || pristine}
                      className="bg-blue text-white"
                      loading={submitting}
                      appearance="primary"
                    >
                      Lưu lại
                    </Button>

                    <Button
                      style={{ marginRight: 15 }}
                      onClick={handleClose}
                      loading={submitting}
                    >
                      Quay lại
                    </Button>
                  </ButtonToolbar>
                </RSForm>
              </>
            )}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateUser;
