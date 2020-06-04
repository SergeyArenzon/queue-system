import { checkValidity } from "./validator.input";

export const updateObject = (oldObject: any, updatedProperties: any) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const inputChanged = (form: any, e: any, inputIdentifier: any) => {
  const updatedFormElement = updateObject(form[inputIdentifier], {
    value: e.target.value,
    valid: checkValidity(e.target.value, form[inputIdentifier].validation),
    touched: true,
  });
  const updatedForm = updateObject(form, {
    [inputIdentifier]: updatedFormElement,
  });

  const formIsValid = Object.keys(updatedForm).every(
    (e) => updatedForm[e].valid
  );
  let ans = "";
  // if (!formIsValid) console.log(updatedForm);

  return { updatedForm, formIsValid };
};
