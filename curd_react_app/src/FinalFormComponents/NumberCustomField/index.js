import PropTypes from "prop-types"
import { memo } from "react"
import { InputNumber } from "rsuite"
import CustomField from "../CustomField"
// ==============================================
NumberCustomField.propTypes = {
  onChange: PropTypes.func.isRequired,
}
// ===========================================
function NumberCustomField(props) {
  const { input, onChange, ...rest } = props
  return (
    <CustomField
      {...props}
      className="w-100"
      min={0}
      accepter={InputNumber}
      onChange={(value, e) => {
        input.onChange(value)
        onChange && onChange(value)
      }}
      {...rest}
    />
  )
}

export default memo(NumberCustomField)
