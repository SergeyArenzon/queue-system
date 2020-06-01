import { loginEmployeeForm, employeeForm, AuthActionsEnum, setNewPasswordEmployeeForm } from "./auth.types";
import API from "../../models/axios/axios";
import { serviceActionsEnum } from "../service/service.types";
import { BusinessActionsEnum } from "../business/business.types";

export const setDomain = (domain: string) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_AUTH });
    localStorage.setItem("domain", domain);
    
    API.get("business/auth/check/" + domain)
      .then((res) => {
        console.log(res.data.message);
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_POST_AUTH });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_AUTH,
          error: msg,
        });
      });
  };
};

export const registerEmployee = (employee: employeeForm) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_AUTH });
   // const domain = localStorage.getItem("domain");

    API.post("/business/auth/register", employee)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_POST_AUTH });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_AUTH,
          error: msg,
        });
      });
  };
};

export const loginEmployee = (form: loginEmployeeForm) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_AUTH });

    API.post("/login", form)
      .then((res) => {
        const token = res.data.token;
        const domain = res.data.domain;
        localStorage.setItem("token", token);
        localStorage.setItem("domain", domain);
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_POST_AUTH });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_AUTH,
          error: msg,
        });
      });
  };
};

export const signInCheck = () => {
  const token = localStorage.getItem("token");
  const domain = localStorage.getItem("domain");
  if (!token || !domain) {
    return { type: AuthActionsEnum.SIGN_IN_CHECK, ans: false, isAdmin: false };
  }
  return (dispatch: any, getState: any) => {
    API.get(domain)
      .then((res) => {
        const businessDeatails = res.data.business;
        const employee = res.data.employee;
        const services = res.data.services;
        console.log(services);

        dispatch({ type: AuthActionsEnum.SIGN_IN_CHECK, ans: true, isAdmin: employee.isAdmin });
        dispatch({ type: serviceActionsEnum.SUCCESS_GET_ALL_SERVICES, services });
        dispatch({ type: BusinessActionsEnum.GET_BUSINESS, deatils: businessDeatails });

        return;
      })
      .catch((error: any) => {
        return dispatch({
          type: AuthActionsEnum.SIGN_IN_CHECK,
          ans: false,
          isAdmin: false,
        });
      });
  };
};

export const resetPasswordEmployee = (phone: string) => {
  console.log(phone);

  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_AUTH });

    API.post("/sendMessage", { phone })
      .then((res) => {
        const token = res.data.token;
        console.log(res.data.message);
        localStorage.setItem("token", token);
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_POST_RESET_PASSWORD });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_AUTH,
          error: msg,
        });
      });
  };
};

export const setNewPasswordEmployee = (
  form: setNewPasswordEmployeeForm,
  token: string
) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_AUTH });

    API.post("/resetPassword/" + token, form)
      .then((res) => {
        console.log(res.data.message);
        const token = res.data.token;
        const domain = res.data.domain;
        localStorage.setItem("token", token);
        localStorage.setItem("domain", domain);
      })
      .then(() => {
        return dispatch({
          type: AuthActionsEnum.SUCCESS_POST_SET_NEW_PASSWORD,
        });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_AUTH,
          error: msg,
        });
      });
  };
};
