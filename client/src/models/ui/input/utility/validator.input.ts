import validator from "validator";

const lattersPattern = /^[a-zA-Z]+$/;
const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const phonePattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const numberPattern = /^\d+$/;

export const checkValidity = (value: any, rules: any) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.isEnglish) {
    isValid = lattersPattern.test(value) && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    isValid = emailPattern.test(value) && isValid;
  }
  if (rules.isPhone) {
    isValid = phonePattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    isValid = numberPattern.test(value) && isValid;
  }
  if (rules.minLen) {
    isValid =
      validator.isLength(value, {
        min: rules.minLen,
        max: 32,
      }) && isValid;
  }

  return isValid;
};
// export const validationEmployee = (employee: Employee, validPassword?: string) => {
//     const phone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
//     if (employee.password !== validPassword) {
//         return language.confirmPasswordError[1];
//     } else if (!phone.test(employee.phone)) {
//         return language.phoneError[1];
//     }
//     return '';
// }
