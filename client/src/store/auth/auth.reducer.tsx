import { initialAuthState } from "./auth.state";
import {
  startAuthActionType, faildAuthActionType, successPostAuthActionType, successPostResetPasswordActionType, successPostSetNewPasswordActionType,
  signInCheckActionType,
  AuthActionsEnum
} from "./auth.types";

type allAuthActionTypes = startAuthActionType | faildAuthActionType | successPostAuthActionType |
  successPostResetPasswordActionType | successPostSetNewPasswordActionType | signInCheckActionType;


export const authReducer = (state = initialAuthState, action: allAuthActionTypes) => {
  switch (action.type) {

    case AuthActionsEnum.START_AUTH:
      console.log("START_AUTH");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case AuthActionsEnum.SUCCESS_POST_AUTH:
      console.log("SUCCESS_POST_AUTH");
      return {
        ...state,
        loading: false,
        error: "",
      };

    case AuthActionsEnum.FALID_AUTH:
      console.log("FALID_AUTH");
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case AuthActionsEnum.SIGN_IN_CHECK:
      console.log("SIGN_IN_CHECK");
      return {
        ...state,
        isSignIn: action.ans,
        isAdmin: action.isAdmin,
      };

    case AuthActionsEnum.SUCCESS_POST_RESET_PASSWORD:
      console.log("SUCCESS_POST_RESET_PASSWORD");
      return {
        ...state,
        loading: false,
        error: "",
      };

    case AuthActionsEnum.SUCCESS_POST_SET_NEW_PASSWORD:
      console.log("SUCCESS_POST_SET_NEW_PASSWORD");
      return {
        ...state,
        loading: false,
        error: "",
      };

    default:
      return state;
  }
};
