import {
  loginEmployeeForm,
  employeeForm,
  AuthActionsEnum,
  businessForm,
} from "./auth.types";
import API from "../../models/axios/axios";

export const getDomain = (domain: string) => {
  return (dispatch: any, getState: any) => {
    localStorage.setItem("domain", domain);
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

export const registerEmployee = (form: employeeForm) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_POST_BUSINESS });
    const domain = localStorage.getItem("domain");
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

export const registerBusiness = (form: businessForm) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_POST_BUSINESS });
    const token = localStorage.getItem("token");
    const send = { ...form, token };
    const domain = localStorage.getItem("domain");

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
}) => {
  return (dispatch: any, getState: any) => {
    const domain = localStorage.getItem("domain");

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
        console.log(msg);

        return dispatch({
          type: AuthActionsEnum.FALID_POST_BUSINESS,
          error: msg,
        });
      });
  };
};

export const loginEmployee = (form: loginEmployeeForm) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_POST_BUSINESS });
    API.post("/login", form)
      .then((res) => {
        const token = res.data.token;
        const domain = res.data.domain;
        localStorage.setItem("token", token);
        localStorage.setItem("domain", domain);
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


export const signInCheck = () => {
  const token = localStorage.getItem("token");
  const domain = localStorage.getItem("domain");
  if (!token || !domain) {
    return { type: AuthActionsEnum.SIGN_IN, ans: false, isAdmin: false }
  }
  return (dispatch: any, getState: any) => {
    API.post(domain + "/business", { token })
      .then((res) => {
        const isAdmin = res.data.employee.isAdmin;
        console.log(res.data.employee, 'ss');
        
        return dispatch({ type: AuthActionsEnum.SIGN_IN, ans: true, isAdmin: isAdmin })
      })
      .catch((error: any) => {
        return dispatch({ type: AuthActionsEnum.SIGN_IN, ans: false, isAdmin: false })
      });
  }
}