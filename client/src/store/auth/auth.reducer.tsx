import { initialAuthState } from "./auth.state";
import {
  startPostBusinessActionType,
  successPostBusinesActionType,
  faildPostBusinesActionType,
  AuthActionsEnum,
  signInActionType,
  startPostResetPasswordActionType,
  successPostResetPasswordActionType,
  faildPostResetPasswordActionType,
} from "./auth.types";

type allAuthActionTypes =
  | startPostBusinessActionType
  | successPostBusinesActionType
  | faildPostBusinesActionType
  | signInActionType
  | startPostResetPasswordActionType
  | successPostResetPasswordActionType
  | faildPostResetPasswordActionType;

export const authReducer = (
  state = initialAuthState,
  action: allAuthActionTypes
) => {
  switch (action.type) {
    case AuthActionsEnum.START_POST_BUSINESS:
      console.log("START_POST_BUSINESS");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case AuthActionsEnum.SUCCESS_POST_BUSINESS:
      console.log("SUCCESS_POST_BUSINESS");
      return {
        ...state,
        loading: false,
        error: "",
      };

    case AuthActionsEnum.FALID_POST_BUSINESS:
      console.log("FALID_POST_BUSINESS");
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case AuthActionsEnum.SIGN_IN:
      console.log("SIGN_IN");
      return {
        ...state,
        isSignIn: action.ans,
        isAdmin: action.isAdmin,
      };

    case AuthActionsEnum.START_POST_RESET_PASSWORD:
      console.log("START_POST_RESET_PASSWORD");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case AuthActionsEnum.SUCCESS_POST_RESET_PASSWORD:
      console.log("SUCCESS_POST_RESET_PASSWORD");
      return {
        ...state,
        loading: false,
        error: "",
      };

    case AuthActionsEnum.FALID_POST_RESET_PASSWORD:
      console.log("FALID_POST_RESET_PASSWORD");
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
