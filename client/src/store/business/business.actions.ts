import {
  BusinessActionsEnum,
  businessForm,
  businesHourForm,
} from "./business.types";
import API from "../../models/axios/axios";

export const registerBusiness = (form: businessForm) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: BusinessActionsEnum.START_POST_BUSINESS });
    const token = localStorage.getItem("token");
    const send = { ...form, token };
    const domain = localStorage.getItem("domain");

    API.post(domain + "/business/details", send)
      .then((res) => {
        console.log(res.data.msg, "test");
      })
      .then(() => {
        return dispatch({ type: BusinessActionsEnum.SUCCESS_POST_BUSINESS });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: BusinessActionsEnum.FALID_POST_BUSINESS,
          error: msg,
        });
      });
  };
};

export const postBuisnessHours = (form: businesHourForm) => {
  return (dispatch: any, getState: any) => {
    const domain = localStorage.getItem("domain");

    dispatch({ type: BusinessActionsEnum.START_POST_BUSINESS });
    const token = localStorage.getItem("token");
    const send = { schedule: { ...form }, token };

    API.post(domain + "/business/details/hours", send)
      .then((res) => {
        console.log(res.data.msg, "test");
      })
      .then(() => {
        return dispatch({ type: BusinessActionsEnum.SUCCESS_POST_BUSINESS });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        console.log(msg);

        return dispatch({
          type: BusinessActionsEnum.FALID_POST_BUSINESS,
          error: msg,
        });
      });
  };
};
