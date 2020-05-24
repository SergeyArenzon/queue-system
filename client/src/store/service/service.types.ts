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
  FALID_SERVICE = "FALID_SERVICE",
  START_GET_ALL_SERVICES = "START_GET_ALL_SERVICES",
  SUCCESS_GET_ALL_SERVICES = "SUCCESS_GET_ALL_SERVICES",
  START_UPDATE_SERVICE = "START_UPDATE_SERVICE",
  SUCCESS_UPDATE_SERVICE = "SUCCESS_UPDATE_SERVICE"
}

export interface serviceActionPattern {
  type: serviceActionsEnum; //Action Type
}

export interface startPostServicectionType extends serviceActionPattern {
  type: serviceActionsEnum.START_POST_SERVICE;
}

export interface postServicectionType extends serviceActionPattern {
  type: serviceActionsEnum.POST_SERVICE;
  form: Service;
}

export interface successPostServicesActionType extends serviceActionPattern {
  type: serviceActionsEnum.SUCCESS_POST_SERVICE;
  service: Service;
}

export interface faildServiceActionType extends serviceActionPattern {
  type: serviceActionsEnum.FALID_SERVICE;
  error: Error;
}

export interface startGetAllServicesctionType extends serviceActionPattern {
  type: serviceActionsEnum.START_GET_ALL_SERVICES;
}

export interface successGetAllServicesActionType extends serviceActionPattern {
  type: serviceActionsEnum.SUCCESS_GET_ALL_SERVICES;
  services: Service[];
}

export interface startUpdateServicectionType extends serviceActionPattern {
  type: serviceActionsEnum.START_UPDATE_SERVICE;
}

export interface successUpdateServiceActionType extends serviceActionPattern {
  type: serviceActionsEnum.SUCCESS_UPDATE_SERVICE;
  service: Service;
}