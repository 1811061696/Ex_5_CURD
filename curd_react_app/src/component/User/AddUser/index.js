import { Modal, Placeholder, Button, ButtonToolbar  } from "rsuite";

import classNames from "classnames/bind";
import styles from "./Adduser.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function AddUser() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <div className="modal-container">
      <ButtonToolbar>
        <Button appearance="primary" onClick={() => handleOpen()}>Thêm mới</Button>
      </ButtonToolbar>
      <Modal full show={open} sonHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Thêm mới khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Graph rows={8}  className={cx("modal_body")}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleClose()} appearance="primary">
            Lưu lại
          </Button>
          <Button onClick={() => handleClose()} appearance="subtle">
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddUser;
