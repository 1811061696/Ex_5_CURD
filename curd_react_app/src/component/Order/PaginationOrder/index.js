/* eslint-disable eqeqeq */
import classNames from "classnames/bind";
import ReactPaginate from "react-paginate";
import styles from "./PaginationOrder.module.scss";
import UpdateOrder from "../UpdateOrder";
import DeleteOrder from "../DeleteOrder";
import { useEffect, useRef, useState } from "react";
import { Icon } from "rsuite";
import { getIdProduct, getIdUser } from "../AddOrder";
import { getAllProduct, getAllUser, getOneUser } from "../../../Api/ApiOrder";

const cx = classNames.bind(styles);

function PaginationOrder(props) {
  const data = props.data;
  const [dataUser, setDataUser] = useState();
  const [user, setUser] = useState();
  const [dataProduct, setDataProduct] = useState();
  const [product, setProduct] = useState();
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

  useEffect(() => {
    const fetchApi = async () => {
      const userList = await getAllUser();
      setDataUser(userList.users);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const productList = await getAllProduct();
      setDataProduct(productList.products);
    };
    fetchApi();
  }, []);

  const handleCheckValueUser = (value) => {
    var res = getIdUser(dataUser, value);
    setUser(res);
  };

  const handleCheckValueProduct = (value) => {
    var res = getIdProduct(dataProduct, value);
    setProduct(res);
  };

  const handleShowInformation = (e) => {
    setIdShowInformation(e.target.id);
    setShowInformation(!showInformation);
    handleCheckValueUser(e.target.id);
    handleCheckValueProduct(
      e.target.parentElement.parentElement.getElementsByTagName("td")[5]
        .innerText
    );
  };

  const handleShowImage = (e) => {
    setShowImage(true);
  };

  const handleClose = () => {
    setShowImage(false);
  };

  return (
    <div className={cx("paghination")}>
      {showImage === true ? (
        <div className={cx("show_image")}>
          <img src={user.image} alt="" onClick={handleClose} />
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
                        id={item.userName}
                        onClick={handleShowInformation}
                        icon={
                          showInformation === true &&
                          idShowInformation == item.userName
                            ? "minus-square-o"
                            : "plus-square-o"
                        }
                      />
                    </td>
                    <td className={cx("text_color")}>{item.id}</td>
                    <td className={cx("text_color")}>{item.userName}</td>
                    <td>{item.phone}</td>
                    <td className={cx("text_color")}>{item.addressOrder}</td>
                    <td>{item.productName}</td>
                    <td className={cx("text_color")}>{item.amount}</td>
                    <td>{item.unitPrice}</td>
                    <td className={cx("text_color")}>{item.total}</td>
                    <td>
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

                  {showInformation === true &&
                  idShowInformation == item.userName ? (
                    <div className={cx("user_information")}>
                      {user.image !== undefined ? (
                        <img
                          src={user.image}
                          alt="avata"
                          className={cx("avata_user")}
                          onClick={handleShowImage}
                        />
                      ) : (
                        <img src="" alt="avata" />
                      )}
                      <div style={{ display: "flex" }}>
                        <div className={cx("group_information")}>
                          <p
                            style={{
                              color: "red",
                              fontWeight: 600,
                              height: 50
                            }}
                          >
                            Thông tin khách hàng:{" "}
                          </p>
                          <p style={{ color: "red", fontWeight: 600 }}>
                            Thông tin sản phẩm:{" "}
                          </p>
                        </div>
                        <div className={cx("group_information")}>
                          <p className={cx("info_title")}>
                            Tên đầy đủ: {user.firstName + " " + user.lastName}
                          </p>
                          <p>Tên sản phẩm: {product.title}</p>
                        </div>
                        <div className={cx("group_information")}>
                          <p className={cx("info_title")}>Tuổi: {user.age}</p>
                          <p>Mô tả: {product.description}</p>
                        </div>
                        <div className={cx("group_information")}>
                          <p className={cx("info_title")}>Ngày sinh: {user.birthDate}</p>
                          <p>Thể loại: {product.category}</p>
                        </div>
                        <div className={cx("group_information")}>
                          <p className={cx("info_title")}>Email: {user.email}</p>
                          <p>Thương hiệu: {product.brand}</p>
                        </div>
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
                        id={item.userName}
                        onClick={handleShowInformation}
                        icon={
                          showInformation === true &&
                          idShowInformation == item.userName
                            ? "minus-square-o"
                            : "plus-square-o"
                        }
                      />
                    </td>
                    <td className={cx("text_color")}>{item.id}</td>
                    <td className={cx("text_color")}>{item.userName}</td>
                    <td>{item.phone}</td>
                    <td className={cx("text_color")}>{item.addressOrder}</td>
                    <td>{item.productName}</td>
                    <td className={cx("text_color")}>{item.amount}</td>
                    <td>{item.unitPrice}</td>
                    <td className={cx("text_color")}>{item.total}</td>
                    <td>
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

                  {showInformation === true &&
                  idShowInformation == item.userName ? (
                    <div className={cx("user_information")}>
                      {user.image !== undefined ? (
                        <img
                          src={user.image}
                          alt="avata"
                          className={cx("avata_user")}
                          onClick={handleShowImage}
                        />
                      ) : (
                        <img src="" alt="avata" />
                      )}
                      <div style={{ display: "flex" }}>
                        <div className={cx("group_information")}>
                          <p
                            style={{
                              color: "red",
                              fontWeight: 600,
                              height: 50
                            }}
                          >
                            Thông tin khách hàng:{" "}
                          </p>
                          <p style={{ color: "red", fontWeight: 600 }}>
                            Thông tin sản phẩm:{" "}
                          </p>
                        </div>
                        <div className={cx("group_information")}>
                          <p className={cx("info_title")}>
                            Tên đầy đủ: {user.firstName + " " + user.lastName}
                          </p>
                          <p>Tên sản phẩm: {product.title}</p>
                        </div>
                        <div className={cx("group_information")}>
                          <p className={cx("info_title")}>Tuổi: {user.age}</p>
                          <p>Mô tả: {product.description}</p>
                        </div>
                        <div className={cx("group_information")}>
                          <p className={cx("info_title")}>Ngày sinh: {user.birthDate}</p>
                          <p>Thể loại: {product.category}</p>
                        </div>
                        <div className={cx("group_information")}>
                          <p className={cx("info_title")}>Email: {user.email}</p>
                          <p>Thương hiệu: {product.brand}</p>
                        </div>
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
