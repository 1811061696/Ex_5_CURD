import PropTypes from "prop-types";
import { memo } from "react";
import { InputPicker } from "rsuite";
import CustomField from "../CustomField";

InputPickerCustomField.propTypes = {
  inputvalue: PropTypes.array,
};

function InputPickerCustomField(props) {
  const { inputStyle, inputValue, inputClassname, input, onChange } = props;
  return (
    <CustomField
      {...props}
      style={inputStyle}
      className={`${inputClassname}`}
      data={inputValue}
      accepter={InputPicker}
      // onChange={(value) => {
      //   if (value === "new") return;
      //   input.onChange(value);
      //   onChange(value);
      // }}
      virtualized={true}
      preventOverflow={true}
      renderMenuItem={(label, item) => {
        return (
          <div
            style={{
              color: label === "Khác" ? "#2665CA" : "#374151",
              fontStyle: label === "Khác" ? "italic" : "normal",
            }}
          >
            {label}
          </div>
        );
      }}
    />
  );
}

export default memo(InputPickerCustomField);
