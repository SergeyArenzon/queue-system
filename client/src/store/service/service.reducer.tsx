import { initialserviceState } from "./service.state";
import {
  startServicectionType,
  successPostServicesActionType,
  faildServiceActionType,
  serviceActionsEnum,
  successGetAllServicesActionType,
  successUpdateServiceActionType
} from "./service.types";

type allserviceActionTypes =
  startServicectionType | successPostServicesActionType | successUpdateServiceActionType
  | faildServiceActionType | successGetAllServicesActionType;

export const serviceReducer = (state = initialserviceState, action: allserviceActionTypes) => {
  switch (action.type) {
    case serviceActionsEnum.START_SERVICE:
      console.log("START_SERVICE");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case serviceActionsEnum.SUCCESS_POST_SERVICE:
      console.log("SUCCESS_POST_SERVICE");
      const services = [...state.services];
      services.push(action.service);
      return {
        ...state,
        loading: false,
        error: "",
        services: services,
      };

    case serviceActionsEnum.FALID_SERVICE:
      console.log("FALID_SERVICE");
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case serviceActionsEnum.SUCCESS_UPDATE_SERVICE:
      console.log("SUCCESS_UPDATE_SERVICE");
      const s = [...state.services];
      console.log(s);

      for (let index = 0; index < s.length; index++) {
        if (action.service.id === s[index].id) {
          s.splice(index, 1, action.service);
          break;
        }
      }
      return {
        ...state,
        loading: false,
        error: "",
        services: s
      };

    case serviceActionsEnum.SUCCESS_GET_ALL_SERVICES:
      console.log("SUCCESS_GET_ALL_SERVICES");
      return {
        ...state,
        loading: false,
        error: "",
        services: action.services
      };
  }
  return state;
};
