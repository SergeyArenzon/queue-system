import { initialAuthState } from "./business.state";
import {
  startPostBusinessActionType,
  postBusinessActionType,
  successPostBusinesActionType,
  faildPostBusinesActionType,
  BusinessActionsEnum,
} from "./business.types";

type allAuthActionTypes =
  | startPostBusinessActionType
  | postBusinessActionType
  | successPostBusinesActionType
  | faildPostBusinesActionType;

export const businessReducer = (
  state = initialAuthState,
  action: allAuthActionTypes
) => {
  switch (action.type) {
    case BusinessActionsEnum.START_POST_BUSINESS:
      console.log("START_POST_BUSINESS");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case BusinessActionsEnum.SUCCESS_POST_BUSINESS:
      console.log("SUCCESS_POST_BUSINESS");
      return {
        ...state,
        loading: false,
        error: "",
      };

    case BusinessActionsEnum.FALID_POST_BUSINESS:
      console.log("FALID_POST_BUSINESS");
      return {
        ...state,
        loading: false,
        error: action.error,
      };
  }
  return state;
};
