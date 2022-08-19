import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import DeleteUser from "../DeleteUser";
import UpdateUser from "../UpdateUser";
import styles from "./Paghination.module.scss";

const cx = classNames.bind(styles);

function Paghination(props) {
  const data = props.data;
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

  return (
    <div className={cx("paghination")}>
      <table>
        <tbody className={cx("list__table")}>
          {currentItems.reverse().map((item, index) => {
            if (index % 2 === 0) {
              return (
                <tr key={index}>
                  <td className={cx("text_color")}>{item.name}</td>
                  <td className={cx("text_color")}>{item.phone}</td>
                  <td>{item.date}</td>
                  <td className={cx("text_color")}>{item.address}</td>
                  <td className={cx("text_color")}>{item.email}</td>
                  <td className={cx("text_color")}>
                    <div className={cx("table_option")}>
                      <UpdateUser
                        updateUser={props.handleUpdate}
                        id={item.id}
                      />
                      <DeleteUser
                        deleteUser={props.handleDelete}
                        id={item.id}
                      />
                    </div>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={index} className={cx("background__table")}>
                  <td className={cx("text_color")}>{item.name}</td>
                  <td className={cx("text_color")}>{item.phone}</td>
                  <td>{item.date}</td>
                  <td className={cx("text_color")}>{item.address}</td>
                  <td className={cx("text_color")}>{item.email}</td>
                  <td className={cx("text_color")}>
                    <div className={cx("table_option")}>
                      <UpdateUser
                        updateUser={props.handleUpdate}
                        id={item.id}
                      />
                      <DeleteUser
                        deleteUser={props.handleDelete}
                        id={item.id}
                      />
                    </div>
                  </td>
                </tr>
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

export default Paghination;
