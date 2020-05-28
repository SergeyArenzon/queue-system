import validator from "validator";

import * as language from "../../../../../assets/language/language";

export const updateObject = (oldObject: any, updatedProperties: any) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value: any, rules: any) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isPhone) {
    isValid = validator.isMobilePhone(value) && isValid;
  }
  if (rules.minLen) {
    isValid =
      validator.isLength(value, {
        min: rules.minLen,
        max: 11,
      }) && isValid;
  }

  return isValid;
};

export const inputChanged = (form: any, event: any, inputIdentifier: any) => {
  const updatedFormElement = updateObject(form[inputIdentifier], {
    value: event.target.value,
    valid: checkValidity(event.target.value, form[inputIdentifier].validation),
    touched: true,
  });
  const updatedForm = updateObject(form, {
    [inputIdentifier]: updatedFormElement,
  });

  let formIsValid = true;
  for (let inputIdentifier in updatedForm) {
    formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
  }
  return { updatedForm, formIsValid };
};

export const password = {
  elementType: "input",
  elementConfig: {
    type: "password",
    placeholder: language.password[1],
  },
  value: "",
  label: language.password[1],
  name: language.password[1],
  validation: {
    required: true,
    minLength: 6,
  },
  valid: false,
  touched: false,
  style: { marginTop: "10px" },
};

export const phone = {
  elementType: "input",
  elementConfig: {
    type: "number",
    placeholder: 0,
  },
  value: "",
  label: language.phone[1],
  name: language.phone[1],
  validation: {
    required: true,
    isPhone: true,
  },
  valid: false,
  touched: false,
  style: { marginTop: "10px" },
};

export const firstName = {
  elementType: "input",
  elementConfig: {
    type: "text",
    placeholder: language.firstName[1],
  },
  value: "",
  label: language.firstName[1],
  name: language.firstName[1],
  validation: {
    required: true,
    minLen: 2,
  },
  valid: false,
  touched: false,
  style: { marginTop: "10px" },
};
