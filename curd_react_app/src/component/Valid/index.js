const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.phone) {
    errors.phone = "Required";
  }
  if (!values.address) {
    errors.address = "Required";
  }
  if (!values.valueCity) {
    errors.valueCity = "Required";
  }
  if (!values.date) {
    errors.date = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  return errors;
};
export default validate;
