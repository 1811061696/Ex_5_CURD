import {
  Modal,
  Button,
  ButtonToolbar,
  HelpBlock,
  Form as RSForm,
  FormGroup,
  ControlLabel,
} from "rsuite";

import {
  DatePickerCustomField,
  InputCustomField,
  InputPickerCustomField,
  NumberCustomField,
} from "../../../FinalFormComponents";

import classNames from "classnames/bind";
import styles from "./Adduser.module.scss";
import { useEffect, useRef, useState } from "react";
import { Form as FieldForm, Field } from "react-final-form";
import { getCity, getDistrist } from "../../../Api/Apiaddress";
import { createUser } from "../../../Api/ApiUser";

const cx = classNames.bind(styles);

// lấy ra tên hoặc id của tỉnh/ thành phố
export const getIdCity = (arrConscious, conscious) => {
  if (conscious)
    return arrConscious.find(
      (item) => item.name === conscious || item.code === conscious
    );
  else return { code: 1 };
};

const Error = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true }}>
    {({ meta: { touched, error } }) =>
      touched && error ? (
        <HelpBlock className={cx("form-group-error-message")}>
          {error}
        </HelpBlock>
      ) : null
    }
  </Field>
);

const required = (value) => (value ? undefined : "Required");

function AddUser(props) {
  const formRef = useRef();




  let codeCity;
  const [arrCity, setArrayCity] = useState([]); // data thành phố
  const [arrDistrist, setArrayDistrist] = useState([]); // data quận huyện
  const [valueCity, setValueCity] = useState(); // value thành phố
  const [valueDistrist, setValueDistrist] = useState(); // value quận/huyện

  // khi có value của thành phố
  if (valueCity) {
    var res = getIdCity(arrCity, valueCity); // object của thành phố
    codeCity = parseInt(res.code); // id của thành phố
    console.log(codeCity)
  } else {
    codeCity = 1;
  }

  // gọi Api lấy các thành phố, quận, huyện
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
          console.log(codeCity)
          console.log(arrDistrist)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [codeCity]);

  // gọi Api và gửi đi data muốn push
  const onSubmit = async (values) => {
    console.log(values)
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
    await createUser(values);
    // props.onGetdata(values); // render lại table
  };

  // bật tắt module
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <div className="modal-container">
      <ButtonToolbar>
        <Button appearance="primary" onClick={() => handleOpen()}>
          Thêm mới
        </Button>
      </ButtonToolbar>
      <Modal full show={open} sonHide={handleClose}>
        <Modal.Header onClick={() => handleClose()}>
          <Modal.Title>Thêm mới khách hàng</Modal.Title>
        </Modal.Header>

        <Modal.Body className={cx("modal_body")}>
          <FieldForm
            onSubmit={onSubmit}
            initialValues={{}}
            render={({ handleSubmit, values, submitting, pristine }) => (
              <>
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
                        <Error name="model" />
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_content")}
                          name="phone"
                          component={NumberCustomField}
                          placeholder=" "
                          validate={required}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          SĐT
                        </ControlLabel>
                        <Error name="model" />
                      </div>
                    </FormGroup>
                  </div>

                  {/* ========================================= */}

                  <div>
                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_content")}
                          name="address"
                          component={InputPickerCustomField}
                          placeholder="Chọn"
                          inputValue={arrDistrist}
                          valueKey="code"
                          labelKey="name"
                          validate={required}
                          
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Quận/Huyện
                        </ControlLabel>
                        <Error name="model" />
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_content")}
                          name="valueCity"
                          component={InputPickerCustomField}
                          placeholder="Chọn"
                          inputValue={arrCity}
                          valueKey="code"
                          labelKey="name"
                          validate={required}
                          
                        />

                        <ControlLabel className={cx("input_lable_select")}>
                          Thành phố
                        </ControlLabel>
                        <Error name="model" />
                      </div>
                    </FormGroup>
                  </div>

                  {/* ========================================= */}
                  <div>
                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_date")}
                          name="date"
                          component={DatePickerCustomField}
                          placeholder=" "
                          validate={required}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Ngày sinh
                        </ControlLabel>
                        <Error name="model" />
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div>
                        <Field
                          name="email"
                          component={InputCustomField}
                          placeholder=" "
                          validate={required}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Email
                        </ControlLabel>
                        <Error name="model" />
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
                      Hủy
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

export default AddUser;
