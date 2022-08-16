import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { ControlLabel, FormControl, FormGroup } from "rsuite";
import styles from "./CustomField.module.scss";

const cx = classnames.bind(styles);

CustomField.propTypes = {
  name: PropTypes.string,
  message: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  defaultstyle: PropTypes.bool,
};

export default function CustomField(props) {
  const {
    message,
    label,
    accepter,
    input,
    meta,
    style,
    className,
    labelClassname,
    labelStyle,
    defaultStyle,
    errorPlacement,
    ...rest
  } = props;

  return (
    <FormGroup style={{ ...style }} className={cx("custom-form-group")}>
      {label && (
        <ControlLabel className={labelClassname} style={labelStyle}>
          {label}
        </ControlLabel>
      )}

      <FormControl
        {...input}
        {...rest}
        className={className}
        accepter={accepter}
        errorMessage={meta.touched && meta.error ? meta.error : null}
        errorPlacement={errorPlacement || "bottomStart"}
        classPrefix={
          defaultStyle
            ? "rs-form-control"
            : "rs-form-control-wrapper custom-form-control"
        }
      />
    </FormGroup>
  );
}
