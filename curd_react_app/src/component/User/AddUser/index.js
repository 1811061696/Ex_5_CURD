import {
  Button,
  ButtonToolbar,
  ControlLabel,
  Form as RSForm,
  FormGroup,
  Modal,
} from "rsuite";

import {
  DatePickerCustomField,
  InputCustomField,
  InputPickerCustomField,
  NumberCustomField,
  UploaderCustomField,
  RadioCustomField,
} from "../../../FinalFormComponents";

import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Field, Form as FieldForm } from "react-final-form";
import { getCity, getDistrist } from "../../../Api/Apiaddress";
import { createUser } from "../../../Api/ApiUser";
import styles from "./Adduser.module.scss";

const cx = classNames.bind(styles);

// lấy ra tên hoặc id của tỉnh/ thành phố
export const getIdCity = (arrConscious, conscious) => {
  if (conscious)
    return arrConscious.find(
      (item) => item.name === conscious || item.code === conscious
    );
  else return { code: 1 };
};

// valid
const required = (value) => (value ? undefined : "Required");

const handleCheckEmail = (value) => {
  if (value) {
    return /\S+@\S+\.\S+/.test(value) ? undefined : "Vui lòng nhập đúng Email";
  } else {
    return "Required";
  }
};

export const handleCheckNumber = (value) => {
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

// custom date
export const handleCustomDate = (value) => {
  if (typeof value.date !== "object") {
    return value.date;
  } else {
    const Year = value.date.getFullYear();
    const Month = value.date.getMonth() + 1;
    const Date = value.date.getDate();
    const date = Year + "-" + Month + "-" + Date;

    return date;
  }
};

function AddUser(props) {
  const formRef = useRef();

  let codeCity;
  const [arrCity, setArrayCity] = useState([]); // data thành phố
  const [arrDistrist, setArrayDistrist] = useState([]); // data quận huyện
  const [valueCity, setValueCity] = useState(); // value thành phố
  const [image, setImage] = useState();
  const [sex, setsex] = useState("Nam");

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
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [codeCity]);

  // gọi Api và gửi đi data muốn push
  const onSubmit = async (values) => {
    const date = handleCustomDate(values);
    const newValue = {
      ...values,
      date,
      image,
      sex,
    };
    console.log(values);

    // gọi Api post user và truyền đi data
    await createUser(newValue);
    props.onGetdata(newValue); // render lại table
    handleClose();
  };

  // bật tắt module
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //
  const imgRef = useRef();
  const handlePreview = (e) => {
    const file = e.target.files[0];
    const render = new FileReader();

    render.addEventListener(
      "load",
      function () {
        imgRef.current.src = render.result;
        setImage(render.result);
      },
      false
    );

    if (file) {
      render.readAsDataURL(file);
    }
  };

  const handleSex = (e) => {
    const newSex = e.target.innerText;
    setsex(newSex);
  };

  const radioList = [
    {
      value: 1,
      label: "Nam",
      onRadioChange: handleSex,
    },
    {
      value: 2,
      label: "Nữ",
      onRadioChange: handleSex,
    },
    {
      value: 3,
      label: "Khác",
      onRadioChange: handleSex,
    },
  ];

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
            render={({ handleSubmit, values, submitting, pristine, form }) => (
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
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_content")}
                          name="phone"
                          component={NumberCustomField}
                          placeholder=" "
                          validate={handleCheckNumber}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          SĐT
                        </ControlLabel>
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
                          placeholder="Chọn"
                          inputValue={arrCity}
                          valueKey="name"
                          labelKey="name"
                          validate={required}
                          onSelect={(value) => {
                            if (values.address) {
                              form.change("address", null);
                            }
                          }}
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
                          name="email"
                          component={InputCustomField}
                          placeholder=" "
                          validate={handleCheckEmail}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Email
                        </ControlLabel>
                      </div>
                    </FormGroup>
                  </div>

                  {/* =========================================== */}

                  <div>
                    <FormGroup>
                      <div className={cx("form_upload")}>
                        <Field
                          name="image"
                          component="input"
                          type="file"
                          onChange={handlePreview}
                        />
                        <img
                          src=""
                          alt=""
                          ref={imgRef}
                          className={cx("user_image")}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Avata
                        </ControlLabel>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_sex")}
                          name="sex"
                          component={RadioCustomField}
                          inputvalue={radioList}
                          initialValue={sex}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Giới tính
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

export default AddUser;
