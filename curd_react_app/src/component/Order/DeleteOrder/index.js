import { Button, Icon, Modal, Placeholder } from "rsuite";
import { useState } from "react";
import { Form } from "react-final-form";

import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./DeleteOrder.module.scss";
import { handleDeleteOrder } from "../../../Api/ApiOrder";

const cx = classNames.bind(styles);

DeleteOrder.propTypes = {
  data: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

function DeleteOrder(props) {
  const { id, deleteUser } = props;
  const onSubmit = async () => {
    await handleDeleteOrder(id);
    deleteUser(id);
  };

  // bật tắt module
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div className={cx("delete_order")}>
      <Icon
        icon="trash-o"
        className={cx("delete")}
        onClick={() => handleOpen()}
      />
      <Modal size="sm" show={open} sonHide={handleClose}>
        <Modal.Header onClick={() => handleClose()}>
          <Modal.Title>Xóa đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Graph height="40px" style={{ background: "#fff" }}>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={cx("delete_form")}>
                  Bạn chắc chắn muốn xóa đơn hàng này?
                  <div>
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

export default DeleteOrder;
