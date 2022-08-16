import { memo } from "react";
import { Input } from "rsuite";
import CustomField from "../CustomField";

InputCustomField.propTypes = {};


function InputCustomField(props) {
  const { inputstyle, inputclassname, value, onChange, ...rest } = props;

  return (
    <CustomField
      {...props}
      style={inputstyle}
      className={`${inputclassname}`}
      accepter={Input}
      block
      {...rest}
      value={value}
    />
  );
}


export default memo(InputCustomField);