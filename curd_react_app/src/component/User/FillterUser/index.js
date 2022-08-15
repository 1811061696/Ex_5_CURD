import { Input, SelectPicker, DatePicker } from "rsuite";
import { getCity } from "../../../Api/Apiaddress";
import classNames from "classnames/bind";
import styles from "./FillterUser.module.scss";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function FillterUser(props) {
  const [arrayUser, setArrUser] = useState(Object.values(props).flat(1));
  const [arrCity, setArrayCity] = useState([]); // data thành phố
  // lấy data city
  useEffect(() => {
    let change = true;
    getCity().then((items) => {
      if (change) {
        setArrayCity(items);
      }
    });
    return () => (change = false);
  }, []);
  const data = arrCity;

  function hadleFillter(arrayUser, value) {
    const dataRender = [];
    arrayUser.map((item) => {
      if (item.name === value) {
        dataRender.push(item);
      } else if (item.phone === value) {
        dataRender.push(item);
      } else if (item.address === value) {
        dataRender.push(item);
      } else if (item.date === value) {
        dataRender.push(item);
      }
    //   console.log(dataRender)
    //   props.onGetdata(dataRender)
    console.log(props.onGetdata)
    });
  }

  return (
    <div className={cx("fillter_wrapper")}>
      <div className={cx("fillter_form")}>
        <div className={cx("input_double")}>
          <div className={cx("input_form")}>
            <Input
              type="text"
              className={cx("input")}
              onBlur={(e) => {
                hadleFillter(arrayUser, e.target.value);
                e.target.value = "";
              }}
            />
            <span className={cx("input_lable")}>Tên khách hàng</span>
          </div>
          <div className={cx("input_form")}>
            <Input
              type="number"
              min = "0"
              className={cx("input")}
              onBlur={(e) => {
                hadleFillter(arrayUser, e.target.value);
                e.target.value = "";
              }}
            />
            <span className={cx("input_lable")}>SĐT</span>
          </div>
        </div>

        <div className={cx("input_double")}>
          <div className={cx("input_form")}>
            <SelectPicker
              data={data}
              valueKey="code"
              labelKey="name"
              className={cx("input")}
              placeholder=""
              onBlur={(e) => {
                hadleFillter(arrayUser, e.target.value);
                e.target.value = "";
              }}
            />
            <span className={cx("input_lable")}>Quận/Huyện</span>
          </div>
          <div className={cx("input_form")}>
            <DatePicker
              className={cx("input_date")}
              onBlur={(e) => {
                hadleFillter(arrayUser, e.target.innerText);
                e.target.value = "";
              }}
            />
            <span className={cx("input_lable")}>Ngày sinh</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FillterUser;
