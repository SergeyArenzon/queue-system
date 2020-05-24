import { initialserviceState } from "./service.state";
import {
  startPostServicectionType,
  postServicectionType,
  successPostServicesActionType,
  faildServiceActionType,
  serviceActionsEnum,
  successGetAllServicesActionType,
  startGetAllServicesctionType,
  startUpdateServicectionType,
  successUpdateServiceActionType
} from "./service.types";
import { Service } from "../../models/system/service";

type allserviceActionTypes =
  startPostServicectionType | postServicectionType
  | successPostServicesActionType | startUpdateServicectionType | successUpdateServiceActionType
  | faildServiceActionType | startGetAllServicesctionType | successGetAllServicesActionType;

export const serviceReducer = (state = initialserviceState, action: allserviceActionTypes) => {
  switch (action.type) {
    case serviceActionsEnum.START_POST_SERVICE:
      console.log("START_POST_SERVICE");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case serviceActionsEnum.SUCCESS_POST_SERVICE:
      const services = [...state.services];
      services.push(action.service);
      console.log("SUCCESS_POST_SERVICE");
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

    case serviceActionsEnum.START_GET_ALL_SERVICES:
      console.log("START_GET_ALL_SERVICES");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case serviceActionsEnum.SUCCESS_GET_ALL_SERVICES:
      console.log("START_GET_ALL_SERVICES");
      return {
        ...state,
        loading: false,
        error: "",
        services: action.services
      };

    case serviceActionsEnum.START_UPDATE_SERVICE:
      console.log("START_UPDATE_SERVICE");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case serviceActionsEnum.SUCCESS_UPDATE_SERVICE:
      console.log("START_GET_ALL_SERVICES");
      const s = [...state.services];
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
  }
  return state;
};
