import {
  Modal,
  Button,
  Placeholder,
  ButtonToolbar,
  Icon,
  Popover,
  Whisper,
  FlexboxGrid,
} from "rsuite";
import { Form as FromRsuite, FormGroup, ControlLabel } from "rsuite";
import { useState, useRef, useEffect } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import PropTypes from "prop-types";
import arrayMutators from "final-form-arrays";

import { AddCustomerApi } from "../../../ApiService/apiCustomer";
import { addOrderApi } from "../../../ApiService/ApiOrder";
import { today, handleDay } from "../../../ApiService/Apiservice";

import TextCustomField from "../../FinalFormComponent/TextCustomField";
import InputPickerCustomField from "../../FinalFormComponent/InputPickerCustomField";
import DatePickerCustomField from "../../FinalFormComponent/DatePickerCustomField";
import RadioCustomField from "../../FinalFormComponent/RadioCustomField";
import UploadAvataFrom from "../../Customer/AddCustomer/UploadForm/UploadAvataFrom";
import NumberCustomField from "../../FinalFormComponent/NumberCustomField";
import NumberFormatField from "../../FinalFormComponent/NumberFormatField";

import { normalizePhone, totalHanlder } from "../../Function/Function";
import { InfoOrder, MessValidate } from "../../SupportUser/Mess";
import { openNotifi } from "../../SupportUser/Notify";

const AddOrder = (props) => {
  const { product, customer, orders, prodvice = ["Hà Nội"], onGetdata } = props;
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const [idAvataCurrent, setIdAvataCurrent] = useState("");
  const [idRef, setIdRef] = useState("");
  const [dis, setDis] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [isDebit, setIsDebit] = useState();

  useEffect(() => {
    const user =
      localStorage.getItem("lastName") + localStorage.getItem("firstName");
    setUser(user);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    setIdAvataCurrent("");
  };
  const saveData = useRef();

  // add item and rendering component parrent with callback
  const onSubmit = async (values) => {
    if (!values.city) {
      values.city = prodvice[0].name;
      if (!values.districst) {
        values.districst = dis[0].name;
      }
    }
    if (values.mobile) {
      values.mobile = values.mobile.replace(/\s/g, "");
    }
    if (isDebit) {
      values.status = "Còn nợ";
      values.due = 0;
    } else {
      values.status = "Hoàn thành";
      values.debit = 0;
    }
    console.log(values.createDate);
    if (values.createDate && values.createDate !== "2022-08-29") {
      values.createDate = handleDay(values.createDate);
    }
    console.log(values.createDate);
    //add new customer
    if (!statusEdit) {
      let newCustomer = {
        city: values.city,
        address: values.address,
        distrist: values.districst,
        full_name: values.full_name,
        note: values.note,
        avata: `idavata${idRef}`,
        mobile: values.mobile,
        gen: values.gen,
        email: values.email,
        idorder: values.idorder,
      };
      await AddCustomerApi(
        newCustomer,
        openNotifi("success", "customer", "add")
      );
    }

    let newValue = {
      ...values,
      mobile: values.mobile,
      userCreate: user,
    };
    await addOrderApi(newValue, openNotifi("success", "order", "add"));
    await onGetdata(newValue);

    setOpen(false);
    setIdAvataCurrent("");
  };
  const data = prodvice.map((item) => ({ label: item.name, value: item.name }));
  const dataMobile = customer.map((item) => {
    return item.mobile;
  });

  function findCustomer(id) {
    const dataCustomer = customer.find(
      (item) => item.id === id || item.mobile === id
    );
    return dataCustomer;
  }
  function findProduct(id) {
    const dataProduct = product.find((item) => item.id === id);
    return dataProduct;
  }
  function handleCity(city) {
    const dataDis = prodvice.find((item) => item.name === city);
    const data = dataDis.districts.map((item) => ({
      label: item.name,
      value: item.name,
    }));
    setDis(data);
  }
  const gen = [
    { label: "nam", value: "nam" },
    { label: "nữ", value: "nữ" },
  ];
  const getIdRef = (id) => setIdRef(id);

  //validate
  const required = (value) => (value ? undefined : MessValidate.required);
  const validateMobile = (mobile) => {
    // check mobile 'vietnam'
    let regex =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (!mobile) {
      return MessValidate.requiredMobile;
    } else if (!regex.test(mobile.replace(/\s/g, ""))) {
      return MessValidate.mobile;
    } else return undefined;
  };
  const validateEmail = (email) => {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !re.test(email)) {
      return MessValidate.email;
    } else return undefined;
  };

  //support user
  const speakerCus = (
    <Popover title="Lưu ý">
      <InfoOrder value="spOrderCreate" />
    </Popover>
  );
  const speakerID = (
    <Popover title="Mã đơn hàng là bắt buộc và duy nhất !">
      <InfoOrder value="spOrderId" />
    </Popover>
  );

  return (
    <>
      <Button color="green" appearance="primary" onClick={() => handleOpen()}>
        Tạo đơn hàng
      </Button>
      <Modal overflow={false} size="lg" show={open} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            Thêm mới đơn hàng
            <span className="title--addOrder">
              Người lập: <u>{user}</u>{" "}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Graph height="580px" classPrefix="popup--addcustomer">
            <FinalForm
              mutators={{
                ...arrayMutators,
              }}
              onSubmit={onSubmit}
              initialValues={{}}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
                form: {
                  mutators: { push, pop, remove },
                },
              }) => (
                <FromRsuite
                  onSubmit={handleSubmit}
                  ref={saveData}
                  className="from--addcustomer"
                >
                  {" "}
                  <div className="grid--addOrder--wrapper">
                    <div className="addorder--wrapper--info flexBetween">
                      <FormGroup classPrefix="">
                        <Field
                          name="createDate"
                          component={DatePickerCustomField}
                          placeholder="Chọn ngày"
                          initialValue={today}
                        ></Field>
                      </FormGroup>
                      <FormGroup classPrefix="grid--addcustomer--item">
                        <Field
                          name="customer"
                          component={InputPickerCustomField}
                          inputvalue={customer}
                          labelKey="full_name"
                          valueKey="id"
                          placeholder="Họ tên..."
                          onSelect={(id) => {
                            //Auto fill on select cusotmer
                            setDis(findCustomer(id).districts);
                            form.change(
                              "full_name",
                              findCustomer(id).full_name
                            );
                            form.change("email", findCustomer(id).email);
                            form.change("dob", findCustomer(id).dob);
                            form.change("city", findCustomer(id).city);
                            form.change("districst", findCustomer(id).distrist);
                            form.change("address", findCustomer(id).address);
                            form.change("mobile", findCustomer(id).mobile);
                            form.change(
                              "idorder",
                              orders[orders.length - 1].id + 1
                            );
                            form.change("gen", findCustomer(id).gen);
                            setIdAvataCurrent(findCustomer(id).avata);
                            setStatusEdit(true);
                          }}
                          onClean={() => {
                            form.reset();
                            setStatusEdit(false);
                            setIdRef("");
                            setDis([]);
                            setStatusEdit(false);

                            setIdAvataCurrent("");
                          }}
                        ></Field>
                        <ControlLabel classPrefix="addcustomer--name--after ">
                          Tìm khách hàng
                        </ControlLabel>
                      </FormGroup>
                      <FormGroup classPrefix="idorder">
                        <Field
                          name="idorder"
                          component={TextCustomField}
                          validate={required}
                          disabled
                        ></Field>
                        <ControlLabel classPrefix="addcustomer--name--after ">
                          Mã hoá đơn *{" "}
                          <Whisper
                            placement="bottomStart"
                            trigger="hover"
                            speaker={speakerID}
                          >
                            <Icon className="active" icon="info-circle"></Icon>
                          </Whisper>
                        </ControlLabel>
                      </FormGroup>
                    </div>

                    <div className="addorder--wrapper--content">
                      <div className="wrapper--info--addorder">
                        <div className="info--customer--addorder">
                          <span className="active">Thông tin khách hàng </span>
                          <Whisper
                            placement="rightStart"
                            trigger="hover"
                            speaker={speakerCus}
                          >
                            <Icon className="active" icon="info-circle"></Icon>
                          </Whisper>
                        </div>
                        <div className="addoder--info--user">
                          <FormGroup classPrefix="grid--addcustomer--item">
                            <Field
                              name="mobile"
                              component={TextCustomField}
                              validate={validateMobile}
                              parse={normalizePhone}
                              disabled={statusEdit}
                              placeholder="___ ___ ____"
                              onBlur={(e) => {
                                //auto create idorder
                                form.change(
                                  "idorder",
                                  orders[orders.length - 1].idorder + 1
                                );
                                let value = e.target.value;
                                if (value) {
                                  value = value.replace(/\s/g, "");
                                }
                                if (dataMobile.find((item) => item === value)) {
                                  setDis(findCustomer(value).districts);
                                  setIdAvataCurrent(findCustomer(value).avata);

                                  if (dis) {
                                    form.change(
                                      "full_name",
                                      findCustomer(value).full_name
                                    );
                                    form.change(
                                      "email",
                                      findCustomer(value).email
                                    );
                                    form.change("dob", findCustomer(value).dob);
                                    form.change(
                                      "city",
                                      findCustomer(value).city
                                    );
                                    form.change(
                                      "districst",
                                      findCustomer(value).distrist
                                    );
                                    setIdAvataCurrent(
                                      findCustomer(value).avata
                                    );
                                    setStatusEdit(false);
                                  }
                                }
                              }}
                            ></Field>

                            <ControlLabel classPrefix="addcustomer--name--after ">
                              Số Điện Thoại *
                            </ControlLabel>
                          </FormGroup>
                          <FormGroup classPrefix="grid--addcustomer--item">
                            <Field
                              name="full_name"
                              component={TextCustomField}
                              className="addorder--name"
                              placeholder=""
                              disabled={statusEdit}
                              onBlur={() => {
                                if (!values.idorder) {
                                  form.change(
                                    "idorder",
                                    orders[orders.length - 1].idorder + 1
                                  );
                                } else if (!values.idorder && orders === []) {
                                  openNotifi("warning", "order", "add");
                                }
                              }}
                            ></Field>

                            <ControlLabel classPrefix="addcustomer--name--after">
                              Tên khách hàng *
                            </ControlLabel>
                          </FormGroup>
                          <FormGroup classPrefix="grid--addcustomer--item">
                            <Field
                              name="gen"
                              disabled={statusEdit}
                              component={RadioCustomField}
                              inputvalue={gen}
                              className="addorder--gen"
                              placeholder="..."
                              initialValue="nữ"
                            ></Field>
                          </FormGroup>
                        </div>
                        <div className="addorder--about">
                          <FormGroup>
                            <Field
                              name="email"
                              disabled={statusEdit}
                              component={TextCustomField}
                              placeholder="email@example.com"
                              validate={validateEmail}
                            ></Field>
                          </FormGroup>
                          <FormGroup>
                            <Field
                              name="note"
                              component={TextCustomField}
                              placeholder="Ghi chú...."
                            ></Field>
                          </FormGroup>
                        </div>
                        <div className="addoder--info--address">
                          <FormGroup>
                            <Field
                              placeholder="..."
                              name="city"
                              disabled={statusEdit}
                              component={InputPickerCustomField}
                              inputvalue={data}
                              onSelect={(value) => {
                                handleCity(value);
                              }}
                            ></Field>

                            <ControlLabel classPrefix="addcustomer--name--after ">
                              Tỉnh/ Thành phố
                            </ControlLabel>
                          </FormGroup>
                          <FormGroup>
                            <Field
                              name="districst"
                              component={InputPickerCustomField}
                              inputvalue={dis}
                              disabled={statusEdit}
                              placeholder="..."
                            ></Field>

                            <ControlLabel classPrefix="addcustomer--name--after ">
                              Quận/huyện
                            </ControlLabel>
                          </FormGroup>
                          <FormGroup>
                            <Field
                              name="address"
                              component={TextCustomField}
                              placeholder="..."
                            ></Field>

                            <ControlLabel classPrefix="addcustomer--name--after">
                              Địa chỉ giao hàng
                            </ControlLabel>
                          </FormGroup>
                        </div>
                      </div>
                      <div className="addorder--avata">
                        <FormGroup>
                          <Field
                            disabled={statusEdit}
                            IdcusEdit={idAvataCurrent}
                            getId={getIdRef}
                            name="avata"
                            component={UploadAvataFrom}
                            {...props}
                          ></Field>

                          <ControlLabel classPrefix="gen--addorder--avata">
                            Avata
                          </ControlLabel>
                        </FormGroup>
                      </div>
                    </div>
                    <FlexboxGrid align="middle" className="addorder--product">
                      <FlexboxGrid.Item colspan={6}>Sản phẩm</FlexboxGrid.Item>
                      <FlexboxGrid.Item colspan={6}>Giá bán</FlexboxGrid.Item>
                      <FlexboxGrid.Item colspan={5}>Số lượng</FlexboxGrid.Item>
                      <FlexboxGrid.Item colspan={5}>
                        Thành tiền{" "}
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item colspan={2}>
                        {" "}
                        <Icon
                          icon="plus"
                          onClick={() => push("product", undefined)}
                        />{" "}
                        <Icon
                          icon="minus"
                          onClick={() => pop("product", undefined)}
                        />{" "}
                      </FlexboxGrid.Item>
                    </FlexboxGrid>

                    <div className="addorder--wrapprer--handle">
                      <div className="addorder--handle--row">
                        <FieldArray name="product">
                          {({ fields }) =>
                            fields.map((name, index) => (
                              <FlexboxGrid
                                key={name}
                                className="addorder--product--row"
                              >
                                <FlexboxGrid.Item colspan={6}>
                                  <FormGroup classPrefix="grid--addorder--product">
                                    <Field
                                      validate={required}
                                      name={`${name}.id`}
                                      component={InputPickerCustomField}
                                      placeholder="Chọn sản phẩm "
                                      inputvalue={product}
                                      labelKey="name"
                                      valueKey="id"
                                      onSelect={(id) => {
                                        form.change(
                                          `${name}.price`,
                                          findProduct(id).price
                                        );
                                        form.change(
                                          `${name}.name`,
                                          findProduct(id).name
                                        );

                                        if (values.product[index]) {
                                          form.change(
                                            `${name}.totalproduct`,
                                            findProduct(id).price *
                                              values.product[index].number
                                          );
                                          let valueTotalProduct;
                                          if (values.product) {
                                            valueTotalProduct = totalHanlder(
                                              values.product,
                                              index
                                            );
                                          }

                                          form.change(
                                            "total",
                                            valueTotalProduct +
                                              findProduct(id).price *
                                                values.product[index].number -
                                              values.sale
                                          );
                                          if (values.money) {
                                            form.change(
                                              "due",
                                              findProduct(id).price *
                                                values.product[index].number -
                                                values.sale
                                            );
                                          }
                                        }
                                      }}
                                      onClean={() => {
                                        if (
                                          values.product[index].number ||
                                          values.product[index].price
                                        ) {
                                          form.change(`${name}.number`, 0);
                                          form.change(`${name}.price`, 0);
                                          form.change(
                                            `${name}.totalproduct`,
                                            0
                                          );
                                          form.change(
                                            "total",
                                            values.totalproduct -
                                              values.totalproduct
                                          );
                                          form.change("sale", 0);
                                          if (values.money > 0) {
                                            form.change(
                                              "due",
                                              values.money - 0
                                            );
                                          }
                                          form.change("debit", 0);
                                        }
                                      }}
                                    ></Field>
                                  </FormGroup>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={6}>
                                  <FormGroup classPrefix="grid--addorder--number">
                                    <Field
                                      name={`${name}.price`}
                                      component={NumberFormatField}
                                      disabled
                                      className="grid--addOrder--price"
                                    ></Field>
                                  </FormGroup>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={5}>
                                  <FormGroup classPrefix="grid--addorder--number">
                                    <Field
                                      name={`${name}.number`}
                                      component={NumberCustomField}
                                      className="grid--addOrder--number"
                                      validate={required}
                                      onChange={(e) => {
                                        form.change(
                                          `${name}.totalproduct`,
                                          e * values.product[index].price
                                        );
                                        let valueTotalProduct;
                                        if (values.product) {
                                          valueTotalProduct = totalHanlder(
                                            values.product,
                                            index
                                          );
                                        }
                                        if (values.sale) {
                                          form.change(
                                            "total",
                                            e * values.product[index].price +
                                              valueTotalProduct -
                                              values.sale
                                          );
                                        } else {
                                          form.change(
                                            "total",
                                            e * values.product[index].price +
                                              valueTotalProduct
                                          );
                                        }
                                      }}
                                    ></Field>
                                  </FormGroup>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={5}>
                                  <FormGroup classPrefix="grid--addorder--number">
                                    <Field
                                      name={`${name}.totalproduct`}
                                      component={NumberFormatField}
                                      disabled
                                      className="grid--addOrder--number"
                                    ></Field>
                                  </FormGroup>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item
                                  className="minusproduct"
                                  colspan={2}
                                >
                                  {" "}
                                  <Field
                                    name={`${name}.minus`}
                                    component={TextCustomField}
                                    disabled
                                  ></Field>
                                  {/* remove product when click to minnus */}
                                  <i
                                    onClick={() => remove("product", index)}
                                    class="fa-solid fa-minus"
                                  ></i>{" "}
                                </FlexboxGrid.Item>
                              </FlexboxGrid>
                            ))
                          }
                        </FieldArray>
                      </div>
                      <div className="addorder--voucher grid--handle">
                        <div>Giảm giá</div>
                        <FormGroup>
                          <Field
                            defaultstyle
                            name="sale"
                            validate={function (e) {
                              if (e > values.total) {
                                openNotifi("error", "order", "sale");
                                return ".";
                              } else return undefined;
                            }}
                            component={NumberFormatField}
                            onChange={(e) => {
                              const i = parseInt(
                                e.target.value.replace(/[^0-9]/g, "")
                              );

                              if (!i) {
                                form.change(
                                  "total",
                                  totalHanlder(values.product)
                                );
                              }
                              if (i) {
                                form.change(
                                  "total",
                                  totalHanlder(values.product) - i
                                );
                                if (i > totalHanlder(values.product)) {
                                } else {
                                  if (values.money) {
                                    if (values.money > values.total) {
                                      form.change(
                                        "due",
                                        values.money - values.total
                                      );
                                    } else {
                                      form.change(
                                        "debit",
                                        values.total - values.money
                                      );
                                    }
                                  }
                                }
                              }
                            }}
                          ></Field>
                        </FormGroup>
                      </div>
                      <div className="addorder--total grid--handle">
                        <div className="wrapper--addorder--total">
                          Tổng tiền đơn hàng
                        </div>
                        <FormGroup>
                          <Field
                            name="total"
                            component={NumberFormatField}
                            disabled
                          ></Field>
                        </FormGroup>
                      </div>
                      <div className="addorder--credit grid--handle">
                        <div>Tổng tiền thanh toán </div>
                        <Button
                          onClick={() => {
                            if (values.total) {
                              form.change("money", values.total);
                              if (values.debit || values.due) {
                                form.change("debit", 0);
                                form.change("due", 0);
                              }
                            }
                          }}
                          className="finsish--money"
                          appearance="ghost"
                          size="xs"
                          color="green"
                        >
                          trả hết
                        </Button>
                        <FormGroup>
                          <Field
                            name="money"
                            component={NumberFormatField}
                            validate={required}
                            placeholder=""
                            onChange={(e) => {
                              const i = parseInt(
                                e.target.value.replace(/[^0-9]/g, "")
                              );
                              if (i < values.total) {
                                setIsDebit(true);
                                form.change("debit", values.total - i);
                              } else {
                                setIsDebit(false);
                                form.change("due", i - values.total);
                              }
                            }}
                          ></Field>
                        </FormGroup>
                        {/* paymentamonut > total => handle due */}
                        {isDebit ? (
                          <div className="debit--wrapper">
                            <div className="affter--debit--due">Còn nợ </div>
                            <FormGroup>
                              <Field
                                disabled
                                name="debit"
                                component={NumberFormatField}
                                placeholder=""
                              ></Field>
                            </FormGroup>
                          </div>
                        ) : (
                          <div className="due--wrapper">
                            <div className="affter--debit--due">
                              Trả lại khách{" "}
                            </div>
                            <FormGroup>
                              <Field
                                disabled
                                name="due"
                                component={NumberFormatField}
                                placeholder=""
                              ></Field>
                            </FormGroup>
                          </div>
                        )}
                      </div>
                    </div>

                    <ButtonToolbar className="buttons addcustomer--button--submit">
                      <Button
                        appearance="primary"
                        type="submit"
                        disabled={submitting || pristine}
                        color="green"
                      >
                        Tạo mới
                      </Button>
                      <Button
                        onClick={() => {
                          form.reset();
                          setStatusEdit(false);
                          setIdRef("");
                          setDis([]);
                          setIdAvataCurrent("");
                        }}
                        color="blue"
                      >
                        Nhập lại
                      </Button>
                    </ButtonToolbar>
                  </div>
                </FromRsuite>
              )}
            />
          </Placeholder.Graph>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="addcustomer--button--back"
            onClick={handleClose}
            appearance="subtle"
          >
            Quay lại
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
AddOrder.protoType = {
  deleteCustomer: PropTypes.func.isRequired,
  onGetdata: PropTypes.func.isRequired,
  product: PropTypes.array.isRequired,
  customer: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
  prodvice: PropTypes.array.isRequired,
  user: PropTypes.string,
};
export default AddOrder;
