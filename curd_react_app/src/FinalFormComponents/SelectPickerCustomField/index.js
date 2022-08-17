import { memo } from "react";
import CustomField from "../CustomField";
import { SelectPicker } from "rsuite";

function SelectPickerCustomField(props) {
  const { inputstyle, inputvalue, inputclassname, ...rest } = props;
  // console.log(props.inputValue)
  return (
    <CustomField
      {...props}
      style={inputstyle}
      className={`w-100 ${inputclassname}`}
      data={props.inputValues}
      placement="auto"
      accepter={SelectPicker}
      {...rest}
    />
  );
}

export default memo(SelectPickerCustomField);
