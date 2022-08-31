/* eslint-disable eqeqeq */
import classNames from "classnames/bind";
import { useState } from "react";
import { Field, Form as FieldForm } from "react-final-form";
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  Drawer,
  Form as RSForm,
  FormGroup,
} from "rsuite";
import PropTypes from "prop-types";

import { InputCustomField } from "../../../FinalFormComponents";
import styles from "./FillterOrder.module.scss";
const cx = classNames.bind(styles);

FillterOrder.propTypes = {
  data: PropTypes.array.isRequired,
  onGetdata: PropTypes.func.isRequired,
};
function FillterOrder(props) {
  const { data, onGetdata } = props;

  const onSubmit = (values) => {
    let newArrUser = [];
    const newValue = {
      ...values,
    };
    // eslint-disable-next-line array-callback-return
    data.map((item) => {
      if (
        newValue.userName !== undefined &&
        newValue.id !== undefined &&
        newValue.productName !== undefined
      ) {
        if (
          item.userName === newValue.userName &&
          item.id == newValue.id &&
          item.phone === newValue.phone
        ) {
          newArrUser.push(item);
        }
      } else {
        if (
          item.id == newValue.id ||
          item.userName === newValue.userName ||
          item.phone === newValue.phone
        ) {
          // lọc đơn
          newArrUser.push(item);
        }
      }
    });
    if (newArrUser.length === 0) {
      alert("Không có khách hàng phù hợp!!!");
    } else {
      onGetdata(newArrUser);
      newArrUser = [];
    }
    // handleClose();
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
          <Drawer.Title>Lọc đơn hàng</Drawer.Title>
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
                >
                  <div className={cx("input_wrapper")}>
                    <FormGroup>
                      <div>
                        <ControlLabel className={cx("input_lable_select")}>
                          Mã đơn hàng
                        </ControlLabel>
                        <Field
                          className={cx("input_content")}
                          name="id"
                          component={InputCustomField}
                          placeholder=" "
                        />
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <div>
                        <ControlLabel className={cx("input_lable_select")}>
                          Tên khách hàng
                        </ControlLabel>
                        <Field
                          className={cx("input_content")}
                          name="userName"
                          component={InputCustomField}
                          placeholder=" "
                        />
                      </div>
                    </FormGroup>
                  </div>

                  {/* ========================================= */}

                  <div className={cx("input_wrapper")}>
                    <FormGroup>
                      <div>
                        <ControlLabel className={cx("input_lable_select")}>
                          Số điện thoại
                        </ControlLabel>
                        <Field
                          className={cx("input_content")}
                          name="phone"
                          component={InputCustomField}
                          placeholder=" "
                        />
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

export default FillterOrder;
