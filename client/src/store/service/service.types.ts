import { Service } from "./../../models/system/service";

export interface serviceState {
  error: string;
  loading: boolean;
  services: Service[];
}

export enum serviceActionsEnum {
  START_POST_SERVICE = "START_POST_SERVICE",
  POST_SERVICE = "POST_SERVICE",
  SUCCESS_POST_SERVICE = "SUCCESS_POST_SERVICE",
  FALID_POST_SERVICE = "FALID_POST_SERVICE",
}

export interface serviceActionPattern {
  type: serviceActionsEnum; //Action Type
}

export interface startPostSERVICEActionType extends serviceActionPattern {
  type: serviceActionsEnum.START_POST_SERVICE;
}

export interface postSERVICEActionType extends serviceActionPattern {
  type: serviceActionsEnum.POST_SERVICE;
  form: Service;
}

export interface successPostBusinesActionType extends serviceActionPattern {
  type: serviceActionsEnum.SUCCESS_POST_SERVICE;
  service: Service;
}

export interface faildPostBusinesActionType extends serviceActionPattern {
  type: serviceActionsEnum.FALID_POST_SERVICE;
  error: Error;
}
