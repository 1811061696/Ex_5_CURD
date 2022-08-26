import classNames from "classnames/bind";
import styles from "./FillterOrder.module.scss";
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
import {
  DatePickerCustomField,
  InputCustomField,
  InputPickerCustomField,
} from "../../../FinalFormComponents";
const cx = classNames.bind(styles);

function FillterOrder() {
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
            <h1>code</h1>
        </Drawer.Body>
      </Drawer>
    </div>
  );
}

export default FillterOrder;
