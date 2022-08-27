import classNames from "classnames/bind";
import styles from "./AddOrder.module.scss";
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  Form as RSForm,
  FormGroup,
  Icon,
  Modal,
} from "rsuite";
import { useEffect, useRef, useState } from "react";
import { Field, Form as FieldForm } from "react-final-form";
import {
  DatePickerCustomField,
  InputCustomField,
  InputPickerCustomField,
  NumberCustomField,
  UploaderCustomField,
  RadioCustomField,
} from "../../../FinalFormComponents";
const cx = classNames.bind(styles);

function UpdateOrder() {
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
          <Modal.Title>Sửa thông tin đơn hàng</Modal.Title>
        </Modal.Header>

        <Modal.Body className={cx("modal_body")}>
          <h1>Code</h1>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateOrder;
