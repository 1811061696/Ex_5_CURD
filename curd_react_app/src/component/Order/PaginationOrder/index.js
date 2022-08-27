/* eslint-disable eqeqeq */
import classNames from "classnames/bind";
import ReactPaginate from "react-paginate";
import styles from "./PaginationOrder.module.scss";
import UpdateOrder from "../UpdateOrder";
import DeleteOrder from "../DeleteOrder";
import { useEffect, useState } from "react";
import { Icon } from "rsuite";

const cx = classNames.bind(styles);

function PaginationOrder(props) {
  const data = props.data;
  const [urlImage, setUrlImage] = useState();
  const [showImage, setShowImage] = useState(false);
  const [showInformation, setShowInformation] = useState(false);
  const [idShowInformation, setIdShowInformation] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  // click page mới
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const handleShowInformation = (e) => {
    setIdShowInformation(e.target.id);
    setShowInformation(!showInformation);
  };
 

  const handleShowImage = (e) => {
    setUrlImage(e.target.src);
    setShowImage(true);
  };

  const handleClose = () => {
    setShowImage(false);
  };
  return (
    <div className={cx("paghination")}>
      {showImage === true ? (
        <div className={cx("show_image")}>
          <img src={urlImage} alt="" onClick={handleClose} />
        </div>
      ) : (
        ""
      )}

      <table>
        <thead>
          <tr className={cx("background__table")}>
            <td>#</td>
            <td>Mã đơn hàng</td>
            <td>Tên khách hàng</td>
            {/* <td>Ngày sinh</td> */}
            <td>Số điện thoại</td>
            <td>Địa chỉ giao hàng</td>
            <td>Tên sản phẩm</td>
            <td>Số lượng</td>
            <td>Đơn giá</td>
            <td>Thành tiền</td>
            <td>Chức năng</td>
          </tr>
        </thead>
        <tbody className={cx("list__table")}>
          {currentItems.reverse().map((item, index) => {
            if (item.name === "Không có đơn hàng phù hợp!!!") {
              return (
                <p style={{ color: "red", marginTop: 8 }}>
                  Không có khách hàng phù hợp
                </p>
              );
            }
            if (index % 2 === 0) {
              return (
                <>
                  <tr key={index}>
                    <td>
                      <Icon
                        style={{ cursor: "pointer" }}
                        id={item.id}
                        onClick={handleShowInformation}
                        icon={
                          showInformation === true &&
                          idShowInformation == item.id
                          ? "minus-square-o" 
                          : "plus-square-o"
                        }
                        />
                    </td>
                    <td className={cx("text_color")}>{item.id}</td>
                    <td>{item.userName}</td>
                    <td className={cx("text_color")}>{item.phone}</td>
                    <td className={cx("text_color")}>{item.addressOrder}</td>
                    <td className={cx("text_color")}>{item.productName}</td>
                    <td className={cx("text_color")}>{item.amount}</td>
                    <td className={cx("text_color")}>{item.unitPrice}</td>
                    <td className={cx("text_color")}>{item.total}</td>
                    <td className={cx("text_color")}>
                      <div className={cx("table_option")}>
                        <UpdateOrder
                          updateUser={props.handleUpdate}
                          id={item.id}
                        />
                        <DeleteOrder
                          deleteUser={props.handleDelete}
                          id={item.id}
                        />
                      </div>
                    </td>
                  </tr>

                  {showInformation === true && idShowInformation == item.id ? (
                    <div className={cx("user_information")}>
                      {item.image !== undefined ? (
                        <img
                          src={item.image}
                          alt="avata"
                          className={cx("avata_user")}
                          onClick={handleShowImage}
                        />
                      ) : (
                        <img src="" alt="avata" />
                      )}
                      <div>
                        <p>Số điện thoại: {item.phone}</p>
                        <p>Tên sản phẩm: {item.productName}</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              );
            } else {
              return (
                <>
                  <tr key={index} className={cx("background__table")}>
                    <td>
                      <Icon
                        style={{ cursor: "pointer" }}
                        id={item.id}
                        onClick={handleShowInformation}
                        icon={
                          showInformation === true &&
                          idShowInformation == item.id
                            ? "minus-square-o"
                            : "plus-square-o"
                        }
                      />
                    </td>
                    <td className={cx("text_color")}>{item.id}</td>
                    <td>{item.userName}</td>
                    <td className={cx("text_color")}>{item.phone}</td>
                    <td className={cx("text_color")}>{item.addressOrder}</td>
                    <td className={cx("text_color")}>{item.productName}</td>
                    <td className={cx("text_color")}>{item.amount}</td>
                    <td className={cx("text_color")}>{item.unitPrice}</td>
                    <td className={cx("text_color")}>{item.total}</td>
                    <td className={cx("text_color")}>
                      <div className={cx("table_option")}>
                        <UpdateOrder
                          updateUser={props.handleUpdate}
                          id={item.id}
                        />
                        <DeleteOrder
                          deleteUser={props.handleDelete}
                          id={item.id}
                        />
                      </div>
                    </td>
                  </tr>

                  {showInformation === true && idShowInformation == item.id ? (
                    <div className={cx("user_information")}>
                      {item.image !== undefined ? (
                        <img
                          src={item.image}
                          alt="avata"
                          className={cx("avata_user")}
                          onClick={handleShowImage}
                        />
                      ) : (
                        <img src="" alt="avata" />
                      )}
                      <div>
                        <p>Số điện thoại: {item.phone}</p>
                        <p>Ngày sinh: {item.date}</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              );
            }
          })}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Sau >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< Trước"
        renderOnZeroPageCount={null}
        activeClassName={cx("active")}
        disabledClassName={cx("disabled")}
      />
    </div>
  );
}

export default PaginationOrder;
