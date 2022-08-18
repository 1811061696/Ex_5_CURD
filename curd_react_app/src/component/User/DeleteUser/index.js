import { Button, Icon, Modal, Placeholder } from "rsuite";
import { useState } from "react";
import { Form } from "react-final-form";

import classNames from "classnames/bind";
import styles from "./DeleteUser.model.scss";
import { handleDeleteUser } from "../../../Api/ApiUser";

const cx = classNames.bind(styles);

function DeleteUser(props) {
  const id = props.id;
  const onSubmit = async () => {
      await handleDeleteUser(id);
      props.deleteUser(id);
  };

  // bật tắt module
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  
  return (
    <div className={cx("delete_user")}>
      <Icon
        icon="trash-o"
        className={cx("delete")}
        onClick={() => handleOpen()}
      />
      <Modal size="sm" show={open} sonHide={handleClose}>
        <Modal.Header onClick={() => handleClose()}>
          <Modal.Title>Xóa khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Graph height="40px" style={{background: "#fff"}}>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={cx("delete_form")}>
                  Bạn chắc chắn muốn xóa khách hàng này?
                  <div >
                    <div>
                      <Modal.Footer className={cx("delete_footer")}>
                        <Button
                        className={cx("button_delete")}
                          onClick={handleClose}
                          type="submit"
                          appearance="primary"
                        >
                          Xóa
                        </Button>
                        <Button onClick={handleClose} appearance="subtle">
                          Hủy
                        </Button>
                      </Modal.Footer>
                    </div>
                  </div>
                </form>
              )}
            />
          </Placeholder.Graph>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DeleteUser;
