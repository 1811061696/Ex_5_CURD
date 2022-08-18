import { memo } from "react";
import { Input } from "rsuite";
import CustomField from "../CustomField";

InputCustomField.propTypes = {};


function InputCustomField(props) {
  const { inputstyle, inputclassname, value, onChange,input, ...rest } = props;
  
  let valueInput = input.value ? input.value : null;


  return (
    <CustomField
      {...props}
      style={inputstyle}
      className={`${inputclassname}`}
      accepter={Input}
      block
      {...rest}
      value={valueInput}
    />
  );
}


export default memo(InputCustomField);