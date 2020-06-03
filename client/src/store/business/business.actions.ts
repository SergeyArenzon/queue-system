import { BusinessActionsEnum } from "./business.types";
import API from "../../models/axios/axios";
import { BusinessDetails } from "../../models/system/business-details";
import { BusinesHours } from "../../models/system/busines-hours";

export const registerBusiness = (form: BusinessDetails) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: BusinessActionsEnum.START_BUSINESS });
    const domain = localStorage.getItem("domain");

    API.post(domain + "/details")
      .then((res) => {
        console.log(res.data.msg, "test");
      })
      .then(() => {
        return dispatch({ type: BusinessActionsEnum.SUCCESS_POST_BUSINESS });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: BusinessActionsEnum.FALID_BUSINESS,
          error: msg,
        });
      });
  };
};

export const postBuisnessHours = (form: BusinesHours) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: BusinessActionsEnum.START_BUSINESS });
    const domain = localStorage.getItem("domain");

    API.post(domain + "/details/hours")
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
          type: BusinessActionsEnum.FALID_BUSINESS,
          error: msg,
        });
      });
  };
};
