import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Field, Form as FieldForm } from "react-final-form";
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  Drawer,
  Form as RSForm,
  FormGroup,
} from "rsuite";

import { getCity, getDistrist } from "../../../Api/Apiaddress";
import {
  DatePickerCustomField,
  InputCustomField,
  InputPickerCustomField,
} from "../../../FinalFormComponents";
import { getIdCity, handleCustomDate } from "../AddUser";
import styles from "./FillterUser.module.scss";

const cx = classNames.bind(styles);

function FillterUser(props) {
  const formRef = useRef();

  let codeCity;
  const [arrCity, setArrayCity] = useState([]); // data thành phố
  const [arrDistrist, setArrayDistrist] = useState([]); // data quận huyện
  const [valueCity, setValueCity] = useState(); // value thành phố

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

  const onSubmit = (values) => {
    let newArrUser = [];
    const date = handleCustomDate(values);
    const newValue = {
      ...values,
      date,
    };

    // eslint-disable-next-line array-callback-return
    props.data.map((item) => {
      if (
        newValue.name !== undefined &&
        newValue.phone !== undefined &&
        newValue.address !== undefined &&
        newValue.valueCity !== undefined &&
        newValue.date !== undefined
      ) {
        if (
          item.phone === newValue.phone &&
          item.name === newValue.name &&
          item.address === newValue.address &&
          item.valueCity === newValue.valueCity &&
          item.date === newValue.date
        ) {
          newArrUser.push(item);
        }
      } else {
        if (
          item.phone === newValue.phone ||
          item.name === newValue.name ||
          item.address === newValue.address ||
          item.valueCity === newValue.valueCity ||
          item.date === newValue.date
        ) {
          // lọc đơn
          newArrUser.push(item);
        }
      }
    });
    if (newArrUser.length === 0) {
      alert("Không có khách hàng phù hợp!!!");
    } else {
      props.onGetdata(newArrUser);
      newArrUser = [];
    }
    handleClose();
  };

  // bật tắt modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div className={cx("fillter_wrapper")}>
      <ButtonToolbar>
        <Button onClick={() => handleOpen()}>Bộ lọc</Button>
      </ButtonToolbar>
      <Drawer show={open} onHide={handleClose}>
        <Drawer.Header>
          <Drawer.Title>Lọc khách hàng</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
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
                  <div className={cx("input_wrapper")}>
                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_content")}
                          name="name"
                          component={InputCustomField}
                          placeholder=" "
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
                          placeholder=" "
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          SĐT
                        </ControlLabel>
                      </div>
                    </FormGroup>
                  </div>

                  {/* ========================================= */}

                  <div className={cx("input_wrapper")}>
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
                  <div className={cx("input_wrapper")}>
                    <FormGroup>
                      <div className={cx("input_wrapper")}>
                        <Field
                          className={cx("input_date")}
                          name="date"
                          component={DatePickerCustomField}
                          placeholder=" "
                          onetap={true}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Ngày sinh
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
                      Lọc
                    </Button>
                    <Button
                      onClick={() => {
                        window.location.reload();
                      }}
                      loading={submitting}
                    >
                      Thoát bộ lọc
                    </Button>
                  </ButtonToolbar>
                </RSForm>
              </>
            )}
          />
        </Drawer.Body>
      </Drawer>
    </div>
  );
}

export default FillterUser;
