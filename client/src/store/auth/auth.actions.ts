import {
  loginEmployeeForm,
  newEmployeeForm,
  AuthActionsEnum,
  newBusinessForm,
} from "./auth.types";
import API from "../../models/axios/axios";

export const getDomain = (domain: string) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_POST_BUSINESS });
    API.get("check/" + domain)
      .then((res) => {
        console.log(res.data.message);
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_POST_BUSINESS });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_POST_BUSINESS,
          error: msg,
        });
      });
  };
};

export const registerEmployee = (form: newEmployeeForm, domain: string) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_POST_BUSINESS });

    API.post(domain + "/business/auth/register", form)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_POST_BUSINESS });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_POST_BUSINESS,
          error: msg,
        });
      });
  };
};

export const registerBusiness = (form: newBusinessForm, domain: string) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_POST_BUSINESS });
    const token = localStorage.getItem("token");
    const send = { ...form, token };

    API.post(domain + "/business/details", send)
      .then((res) => {
        console.log(res.data.msg, "test");
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_POST_BUSINESS });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_POST_BUSINESS,
          error: msg,
        });
      });
  };
};

export const postBuisnessHours = (form: {
  [day: string]: { start: string; end: string }[];
}, domain: string) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_POST_BUSINESS });
    const token = localStorage.getItem("token");
    const send = { schedule: { ...form }, token };

    API.post(domain + "/business/details/hours", send)
      .then((res) => {
        console.log(res.data.msg, "test");
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_POST_BUSINESS });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_POST_BUSINESS,
          error: msg,
        });
      });
  };
};

export const loginEmployee = (form: loginEmployeeForm, domain: string) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_POST_BUSINESS });
    API.post(domain + "/business/auth/login", form)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_POST_BUSINESS });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_POST_BUSINESS,
          error: msg,
        });
      });
  };
};
