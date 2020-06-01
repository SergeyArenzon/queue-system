import { initialAuthState } from "./business.state";
import {
  startBusinessActionType,
  postBusinessActionType,
  successPostBusinesActionType,
  faildBusinesActionType,
  BusinessActionsEnum,
  getBusinessActionType
} from "./business.types";

type allAuthActionTypes = startBusinessActionType | postBusinessActionType | successPostBusinesActionType
  | faildBusinesActionType | getBusinessActionType;

export const businessReducer = (state = initialAuthState, action: allAuthActionTypes) => {
  switch (action.type) {
    
    case BusinessActionsEnum.START_BUSINESS:
      console.log("START_BUSINESS");
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

    case BusinessActionsEnum.FALID_BUSINESS:
      console.log("FALID_BUSINESS");
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case BusinessActionsEnum.GET_BUSINESS:
      console.log("GET_BUSINESS");
      return {
        ...state,
        deatils: action.deatils
      };
  }
  return state;
};
