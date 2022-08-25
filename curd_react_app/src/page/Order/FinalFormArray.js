import classNames from "classnames/bind";
import styles from "./FinalFormArray.scss";
import { Field, Form as FieldForm } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";

import {
  Button,
  ButtonToolbar,
  ControlLabel,
  Form as RSForm,
  FormGroup,
} from "rsuite";
import { InputCustomField } from "../../FinalFormComponents";

const cx = classNames.bind(styles);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const required = (value) => (value ? undefined : "Required");

function FinalFormArray() {
  return (
    <div className={cx("final_form_array_wrapper")}>
      <h1 className={cx("header")}>Ví dụ về final_form_array </h1>
      <div className={cx("form")}>
        <FieldForm
          onSubmit={onSubmit}
          initialValues={{}}
          mutators={{ ...arrayMutators }}
          render={({
            handleSubmit,
            values,
            submitting,
            pristine,
            form,
            form: {
              mutators: { push, pop },
            },
          }) => (
            <>
              <RSForm
                layout="inline"
                className={cx("modal_input")}
                onSubmit={handleSubmit}
                id="form"
              >
                <div>
                  <FormGroup className={cx("form_group")}>
                    <div>
                      <ControlLabel className={cx("company_title")}>
                        Công ty:
                      </ControlLabel>
                      <Field
                        className={cx("input_content")}
                        name="name"
                        component={InputCustomField}
                        placeholder=" "
                        validate={required}
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className={cx("form_group")}>
                    <Button
                      className={cx("add_customer")}
                      type="button"
                      onClick={() => push("customers", undefined)}
                    >
                      Add Customer
                    </Button>
                    <Button
                      className={cx("remove_customer")}
                      type="button"
                      onClick={() => pop("customers")}
                    >
                      Remove Customer
                    </Button>
                  </FormGroup>
                </div>

                <ButtonToolbar className={cx("form_footer")}>
                  <Button
                    type="submit"
                    disabled={submitting || pristine}
                    className="bg-blue text-white"
                    loading={submitting}
                    appearance="primary"
                  >
                    Lưu lại
                  </Button>
                  <Button style={{ marginRight: 15 }} loading={submitting}>
                    Quay lại
                  </Button>
                </ButtonToolbar>
              </RSForm>
            </>
          )}
        />
      </div>
    </div>
  );
}

export default FinalFormArray;
