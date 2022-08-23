import PropTypes from "prop-types";
import { memo } from "react";
import { Uploader } from "rsuite";
import CustomField from "../CustomField";

UploaderCustomField.propTypes = {
  input: PropTypes.object,
  accept: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  inputstyle: PropTypes.object,
  inputclassname: PropTypes.string,
};
function UploaderCustomField(props) {
  console.log(props);
  // props
  const { input, accept, inputstyle, inputclassname, ...rest } = props;
  const { value = "" } = input;

  return (
    <CustomField
      {...input}
      style={inputstyle}
      className={inputclassname}
      accepter={Uploader}
      onChange={(files) => {
        input.onChange(files);
      }}
      {...rest}
    />
  );
}

export default memo(UploaderCustomField);
