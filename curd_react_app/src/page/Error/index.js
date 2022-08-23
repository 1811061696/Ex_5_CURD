import Header from "../../component/Layout/DefaultLayout/Header";
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  Form as RSForm,
  FormGroup,
  Modal,
} from "rsuite";
import { Field, Form as FieldForm } from "react-final-form";
import {
  DatePickerCustomField,
  InputCustomField,
  InputPickerCustomField,
} from "../../FinalFormComponents";
import classNames from "classnames/bind";
import styles from './Error.module.scss'

const cx = classNames.bind(styles)



function Error() {

const onSubmit = async(values) => {

}

  return (
    <div>
      {/* <Header /> */}
      <div className={cx("single_wrapper")}>
        <h1 className={cx("single_header")}>Công bố đơn</h1>
        <div className={cx("single_content")}>
          <FieldForm
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit, values, submitting, pristine, form }) => (
            <>
                <RSForm layout="inline" className={cx("single_input_form")}
                onSubmit={handleSubmit}
                id="form"
                > 
                
                
                </RSForm>
            </>
          )}

          />
        </div>
      </div>
    </div>
  );
}

export default Error;
