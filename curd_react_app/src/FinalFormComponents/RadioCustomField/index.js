import PropTypes from "prop-types"
import { memo } from "react"
import { Radio, RadioGroup } from "rsuite"
import CustomField from "../CustomField"

function RadioCustomField(props) {
  const { inputvalue, inline, defaultValue, ...rest } = props
  return (
    <CustomField
      {...props}
      inline={inline}
      defaultValue={defaultValue}
      accepter={RadioGroup}
      {...rest}
    >
      {inputvalue.map((e, i) => (
        <Radio onClick={e.onRadioChange} key={i} value={e.label}>
          {e.label}
        </Radio>
      ))}
    </CustomField>
  )
}

RadioCustomField.propTypes = {
  inputvalue: PropTypes.array,
}

export default memo(RadioCustomField)
