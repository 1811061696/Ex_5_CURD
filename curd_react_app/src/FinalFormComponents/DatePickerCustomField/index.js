import { memo } from "react";
import PropTypes from "prop-types";
import CustomField from "../CustomField";
import { DatePicker } from "rsuite";
// import addDays from "date-fns/addDays";

DatePickerCustomField.propTypes = {
  timeformat: PropTypes.string,
  onetap: PropTypes.bool,
  defaultdate: PropTypes.string,
};

function DatePickerCustomField(props) {
  const {
    inputstyle,
    input,
    inputclassname,
    timeformat,
    defaultdate,
    ...rest
  } = props;
  let val = input.value ? new Date(input.value) : null;
  
  return (
    <CustomField
      {...props}
      value={val}
      oneTap={timeformat === "DD/MM/YYYY" ? false : true}
      locale={{
        today: "Hôm nay",
        yesterday: "Hôm qua",
        tomorrow: "Ngày mai",
        ok: "Xác nhận",
        sunday: "CN",
        monday: "T2",
        tuesday: "T3",
        wednesday: "T4",
        thursday: "T5",
        friday: "T6",
        saturday: "T7",
        hours: "Giờ",
        minutes: "Phút",
      }}
      style={inputstyle}
      className={`w-100 ${inputclassname}`}
      placement="auto"
      format={timeformat ? timeformat : "DD/MM/YYYY"}
      accepter={DatePicker}
      calendarDefaultDate={defaultdate}
      ranges={[]}
      {...rest}
    />
  );
}

export default memo(DatePickerCustomField);
