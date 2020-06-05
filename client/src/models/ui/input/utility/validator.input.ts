import validator from "validator";
import * as language from "../../../../assets/language/language";

const lattersPattern = /^[a-zA-Z]+$/;
const emailPattern = /^\S+@\S+\.\S+$/;
const phonePattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
const numberPattern = /^\d+$/;
const url = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

export const checkValidity = (value: any, rules: any) => {
  if (!rules) {
    return true;
  }

  else if (rules.required && !(value.trim() !== "")) {
    return language.lengthError[1]
  }

  else if (rules.isEnglish && !(lattersPattern.test(value))) {
    return language.englishOnlyError[1];
  }

  else if (rules.maxLength && (value.length > rules.maxLength)) {
    return language.maxLengthError[1];
  }

  else if (rules.isEmail && !(emailPattern.test(value))) {
    return language.emailError[1];
  }

  else if (rules.isPhone && !(phonePattern.test(value))) {
    return language.phoneError[1];
  }

  else if (rules.isNumeric && !(numberPattern.test(value))) {
    return language.numberError[1];
  }
  else if (rules.minLen && value.length < rules.minLen) {
    return "שדה חייב להכיל לפחות " + rules.minLen + " תווים";
  }

  return '';
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
