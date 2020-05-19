import {
  newEmployeeForm,
  newBusniessForm,
  AuthActionsEnum,
} from "./auth.types";
import API from "../../models/axios/axios";

export const postBusiness = (form: newEmployeeForm) => {
  console.log(form);
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_POST_BUSINESS });

    API.post("business/auth/register", form)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", JSON.stringify(token));
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_POST_BUSINESS });
      })
      .catch((error: any) => {
        return dispatch({ type: AuthActionsEnum.FALID_POST_BUSINESS, error });
      });
  };
};
