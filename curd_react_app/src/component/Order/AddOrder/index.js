import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Field, Form as FieldForm } from "react-final-form";
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  Form as RSForm,
  FormGroup,
  Modal,
} from "rsuite";
import {
  getAllProduct,
  getAllUser,
  getOneProduct,
  getOneUser,
} from "../../../Api/ApiOrder";
import {
  InputCustomField,
  InputPickerCustomField,
  NumberCustomField,
} from "../../../FinalFormComponents";
import { handleCheckNumber } from "../../User/AddUser";
import styles from "./AddOrder.module.scss";
const cx = classNames.bind(styles);

const getIdUser = (listUser, valueAddress) => {
  if (valueAddress)
    return listUser.find((item) => item.lastName === valueAddress);
  else {
  }
};

const getIdProduct = (listProduct, unitPrice) => {
  if (unitPrice) return listProduct.find((item) => item.title === unitPrice);
  else {
  }
};

// valid
const required = (value) => (value ? undefined : "Required");

function AddOrder() {
  const [arrUser, setArrUser] = useState([]);
  const [idNameUser, setIdNameUser] = useState();
  const [valueAddress, setValueAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [arrProduct, setArrProduct] = useState([]);
  const [idNameProduct, setIdNameProduct] = useState([]);
  const [unitPrice, setUnitPrice] = useState();

  const [total, setTotal] = useState(0);
  //user
  // kiểm tra value của user
  const handleCheckValueUser = (value) => {
    if (value) {
      var res = getIdUser(arrUser, value);
      setIdNameUser(parseInt(res.id));
    } else {
      setValueAddress("");
      setPhone("");
    }
  };

  // lấy danh sách các user
  useEffect(() => {
    const fetchApi = async () => {
      const userList = await getAllUser();
      setArrUser(userList.users);
    };
    fetchApi();
  }, []);

  // lấy một user
  useEffect(() => {
    if (idNameUser !== undefined && Number.isNaN(idNameUser) !== true) {
      const fetchApi = async () => {
        const user = await getOneUser(idNameUser);
        setValueAddress(user.address.address);
        setPhone(user.phone);
      };
      fetchApi();
    } else {
      console.log("Chưa có id user");
      setPhone("");
      setValueAddress("");
    }
  }, [idNameUser]);

  // ======================

  // product
  // kiểm tra value của product
  const handleCheckValueProduct = (value) => {
    if (value) {
      var res = getIdProduct(arrProduct, value);
      setIdNameProduct(parseInt(res.id));
    } else {
      setUnitPrice("");
    }
  };

  // lấy danh sách product
  useEffect(() => {
    const fetchApi = async () => {
      const productList = await getAllProduct();
      setArrProduct(productList.products);
    };
    fetchApi();
  }, []);

  // lấy info một product

  useEffect(() => {
    if (idNameProduct !== undefined && Number.isNaN(idNameProduct) !== true) {
      const fetchApi = async () => {
        const product = await getOneProduct(idNameProduct);
        setUnitPrice(product.price);
      };
      fetchApi();
    } else {
      console.log("Chưa có id product");
      setUnitPrice("");
    }
  }, [idNameProduct]);

  //tính toán
  const handleCalculate = (value) => {
    console.log(unitPrice);
    console.log("Ua alo");
  };

  const onSubmit = async (values) => {
    const newValue = {
      ...values,
    };
    console.log(values);
    // gọi Api post user và truyền đi data
    // await createUser(newValue);
    // props.onGetdata(newValue); // render lại table
    // handleClose();
  };

  // bật tắt module
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setValueAddress("");
    setPhone("");
    setIdNameUser("");
    setUnitPrice("");
  };
  return (
    <div className={cx("modal-container")}>
      <ButtonToolbar>
        <Button appearance="primary" onClick={() => handleOpen()}>
          Thêm mới
        </Button>
      </ButtonToolbar>
      <Modal full show={open} sonHide={handleClose}>
        <Modal.Header onClick={() => handleClose()}>
          <Modal.Title>Thêm mới đơn hàng</Modal.Title>
        </Modal.Header>

        <Modal.Body className={cx("modal_body")}>
          <FieldForm
            onSubmit={onSubmit}
            initialValues={{}}
            render={({ handleSubmit, values, submitting, pristine, form }) => (
              <>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
                <RSForm
                  layout="inline"
                  className={cx("modal_input")}
                  onSubmit={handleSubmit}
                  id="form"
                >
                  <div>
                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_content")}
                          name="userName"
                          component={InputPickerCustomField}
                          placeholder="Chọn"
                          inputValue={arrUser}
                          valueKey="lastName"
                          labelKey={"lastName"}
                          validate={required}
                          onSelect={(value) => {
                            if (values.addressOrder) {
                              form.change("addressOrder", valueAddress);
                            }
                            if (values.phone) {
                              form.change("phone", phone);
                            }
                          }}
                          onChange={(value) => {
                            handleCheckValueUser(value);
                          }}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Tên khách hàng
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
                          initialValue={phone}
                          // validate={handleCheckNumber}
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
                          name="addressOrder"
                          component={InputCustomField}
                          placeholder=" "
                          initialValue={valueAddress}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Địa chỉ giao hàng
                        </ControlLabel>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_content")}
                          name="productName"
                          component={InputPickerCustomField}
                          placeholder="Chọn"
                          inputValue={arrProduct}
                          valueKey="title"
                          labelKey={"title"}
                          validate={required}
                          onSelect={(value) => {
                            if (values.unitPrice) {
                              form.change("unitPrice", unitPrice);
                            }
                          }}
                          onChange={(value) => {
                            handleCheckValueProduct(value);
                          }}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Tên sản phẩm
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
                          name="amount"
                          component={NumberCustomField}
                          placeholder=" "
                          // validate={required}
                          onetap={true}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Số lượng
                        </ControlLabel>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div>
                        <Field
                          name="unitPrice"
                          component={NumberCustomField}
                          placeholder=" "
                          initialValue={unitPrice}
                          // handleCalculate={handleCalculate}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Đơn giá
                        </ControlLabel>
                      </div>
                    </FormGroup>
                  </div>

                  {/* =========================================== */}

                  <div>
                    <FormGroup>
                      <div>
                        <Field
                          className={cx("input_sex")}
                          name="total"
                          component={InputCustomField}
                        />
                        <ControlLabel className={cx("input_lable_select")}>
                          Thành tiền
                        </ControlLabel>
                      </div>
                    </FormGroup>
                    <FormGroup></FormGroup>
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

export default AddOrder;
