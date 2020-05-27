import {loginEmployeeForm, employeeForm, AuthActionsEnum} from "./auth.types";
import API from "../../models/axios/axios";

export const getDomain = (domain: string) => {
  return (dispatch: any, getState: any) => {
    localStorage.setItem("domain", domain);
    dispatch({ type: AuthActionsEnum.START_POST_AUTH});
    API.get("check/" + domain)
      .then((res) => {
        console.log(res.data.message);
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_POST_AUTH});
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_POST_AUTH,
          error: msg,
        });
      });
  };
};

export const registerEmployee = (form: employeeForm) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_POST_AUTH});
    const domain = localStorage.getItem("domain");
    API.post(domain + "/business/auth/register", form)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_POST_AUTH});
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_POST_AUTH,
          error: msg,
        });
      });
  };
};

export const loginEmployee = (form: loginEmployeeForm) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_POST_AUTH});
    API.post("/login", form)
      .then((res) => {
        const token = res.data.token;
        const domain = res.data.domain;
        localStorage.setItem("token", token);
        localStorage.setItem("domain", domain);
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_POST_AUTH});
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_POST_AUTH,
          error: msg,
        });
      });
  };
};

export const signInCheck = () => {
  const token = localStorage.getItem("token");
  const domain = localStorage.getItem("domain");
  if (!token || !domain) {
    return { type: AuthActionsEnum.SIGN_IN, ans: false, isAdmin: false };
  }
  return (dispatch: any, getState: any) => {
    API.post(domain + "/business", { token })
      .then((res) => {
        const isAdmin = res.data.employee.isAdmin;
        return dispatch({
          type: AuthActionsEnum.SIGN_IN,
          ans: true,
          isAdmin: isAdmin,
        });
      })
      .catch((error: any) => {
        return dispatch({
          type: AuthActionsEnum.SIGN_IN,
          ans: false,
          isAdmin: false,
        });
      });
  };
};

export const resetPasswordEmployee = (phone: string) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_POST_RESET_PASSWORD });
    API.post("/sendMessage", phone)
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
          type: AuthActionsEnum.FALID_POST_RESET_PASSWORD,
          error: msg,
        });
      });
  };
};
