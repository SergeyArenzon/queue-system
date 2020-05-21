import { initialserviceState } from "./service.state";
import {
  startPostSERVICEActionType,
  postSERVICEActionType,
  successPostBusinesActionType,
  faildPostBusinesActionType,
  serviceActionsEnum,
} from "./service.types";

type allserviceActionTypes =
  | startPostSERVICEActionType
  | postSERVICEActionType
  | successPostBusinesActionType
  | faildPostBusinesActionType;

export const serviceReducer = (
  state = initialserviceState,
  action: allserviceActionTypes
) => {
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
      console.log(action);

      services.push(action.service);
      console.log(services);
      console.log("SUCCESS_POST_SERVICE");
      return {
        ...state,
        loading: false,
        error: "",
        services: services,
      };

    case serviceActionsEnum.FALID_POST_SERVICE:
      console.log("FALID_POST_SERVICE");
      console.log(action);

      return {
        ...state,
        loading: false,
        error: action.error,
      };
  }
  return state;
};
