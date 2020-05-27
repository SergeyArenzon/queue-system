import { initialAuthState } from "./auth.state";
import {
  startPostAuthActionType,
  successPostAuthActionType,
  faildPostAuthActionType,
  AuthActionsEnum,
  signInActionType,
  startPostResetPasswordActionType,
  successPostResetPasswordActionType,
  faildPostResetPasswordActionType,
  startPostSetNewPasswordActionType,
  successPostSetNewPasswordActionType,
  faildPostSetNewPasswordActionType,
} from "./auth.types";

type allAuthActionTypes =
  | startPostAuthActionType
  | successPostAuthActionType
  | faildPostAuthActionType
  | signInActionType
  | startPostResetPasswordActionType
  | successPostResetPasswordActionType
  | faildPostResetPasswordActionType
  | startPostSetNewPasswordActionType
  | successPostSetNewPasswordActionType
  | faildPostSetNewPasswordActionType;

export const authReducer = (
  state = initialAuthState,
  action: allAuthActionTypes
) => {
  switch (action.type) {
    case AuthActionsEnum.START_POST_AUTH:
      console.log("START_POST_Auth");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case AuthActionsEnum.SUCCESS_POST_AUTH:
      console.log("SUCCESS_POST_Auth");
      return {
        ...state,
        loading: false,
        error: "",
      };

    case AuthActionsEnum.FALID_POST_AUTH:
      console.log("FALID_POST_Auth");
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
    case AuthActionsEnum.START_POST_SET_NEW_PASSWORD:
      console.log("START_POST_SET_NEW_PASSWORD");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case AuthActionsEnum.SUCCESS_POST_SET_NEW_PASSWORD:
      console.log("SUCCESS_POST_SET_NEW_PASSWORD");
      return {
        ...state,
        loading: false,
        error: "",
      };

    case AuthActionsEnum.FALID_POST_SET_NEW_PASSWORD:
      console.log("FALID_POST_SET_NEW_PASSWORD");
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
