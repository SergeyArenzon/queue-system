import { Service } from "./../../models/system/service";
import { serviceActionsEnum } from "./service.types";
import API from "../../models/axios/axios";

export const postService = (form: Service) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: serviceActionsEnum.START_POST_SERVICE });
    const token = localStorage.getItem("token");
    const send = { ...form, token };
    console.log(send);

    API.post("react/business/service", send)

      .then((res) => {
        console.log(res.data);

        return dispatch({
          type: serviceActionsEnum.SUCCESS_POST_SERVICE,
          service: res.data.service,
        });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: serviceActionsEnum.FALID_POST_SERVICE,
          error: msg,
        });
      });
  };
};
