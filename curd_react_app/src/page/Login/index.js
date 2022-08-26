import classNames from "classnames/bind";
import { useState } from "react";
import { Field, Form as FieldForm } from "react-final-form";
import {
  Button,
  ControlLabel,
  Form as RSForm,
  FormGroup,
  Icon,
  Message,
} from "rsuite";
import { InputCustomField } from "../../FinalFormComponents";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

const required = (value) => (value ? undefined : "Required");

function Login() {
  const [error, setError] = useState("");

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(username, password);

    const data = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => res.json());
    localStorage.setItem("token", data.token);
    localStorage.setItem("firstName", data.firstName);
    localStorage.setItem("lastName", data.lastName);

    const token = localStorage.getItem("token");
    if (token === "undefined") {
      setError("Tài khoản hoặc mật khẩu không chính xác");
    } else {
      setError("");
      window.location.reload();
    }
  };

  return (
    <div className={cx("login_wrapper")}>
      <div className={cx("login_form")}>
        <h1>Đăng nhập</h1>
        <FieldForm
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit, values, submitting, pristine, form }) => (
            <>
              <RSForm
                layout="inline"
                className={cx("login_form_input")}
                onSubmit={handleSubmit}
                id="form"
              >
                <div>
                  <FormGroup style={{ display: "flex" }}>
                    <div>
                      <ControlLabel className={cx("input_lable_select")}>
                        Tên đăng nhập
                      </ControlLabel>
                      <Field
                        className={cx("input_content")}
                        name="username"
                        component={InputCustomField}
                        placeholder=" "
                        validate={required}
                      />
                      <Icon icon="avatar" className={cx("user_icon")} />
                    </div>
                  </FormGroup>

                  <FormGroup style={{ display: "flex" }}>
                    <div>
                      <ControlLabel className={cx("input_lable_select")}>
                        Mật khẩu
                      </ControlLabel>
                      <Field
                        className={cx("input_content")}
                        name="password"
                        type="password"
                        component={InputCustomField}
                        placeholder=" "
                        validate={required}
                      />
                      <Icon icon="unlock-alt" className={cx("pass_icon")} />
                    </div>
                  </FormGroup>
                  <FormGroup className={cx("input_error")}>
                    {error !== "" ? (
                      <Message showIcon type="error" description={error} />
                    ) : (
                      ""
                    )}
                  </FormGroup>
                  <Button
                    type="submit"
                    disabled={submitting || pristine}
                    className="bg-blue text-white"
                    loading={submitting}
                    appearance="primary"
                    style={{ marginLeft: 322 }}
                  >
                    Đăng nhập
                  </Button>
                </div>
              </RSForm>
            </>
          )}
        />
      </div>
    </div>
  );
}

export default Login;
