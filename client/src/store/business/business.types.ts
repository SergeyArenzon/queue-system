import { BusinessDetails } from "../../models/system/business-details";

export interface BusinessState {
  error: string;
  loading: boolean;
  deatils: BusinessDetails | null
}

export enum BusinessActionsEnum {
  START_BUSINESS = "START_POST_BUSINESS",
  SUCCESS_POST_BUSINESS = "SUCCESS_POST_BUSINESS",
  FALID_BUSINESS = "FALID_POST_BUSINESS",
  POST_BUSINESS = "POST_BUSINESS",
  GET_BUSINESS = "GET_BUSINESS"
}

export interface AuthActionPattern {
  type: BusinessActionsEnum; //Action Type
}

export interface startBusinessActionType extends AuthActionPattern {
  type: BusinessActionsEnum.START_BUSINESS;
}

export interface postBusinessActionType extends AuthActionPattern {
  type: BusinessActionsEnum.POST_BUSINESS;
  form: BusinessDetails;
}

export interface successPostBusinesActionType extends AuthActionPattern {
  type: BusinessActionsEnum.SUCCESS_POST_BUSINESS;
}

export interface faildBusinesActionType extends AuthActionPattern {
  type: BusinessActionsEnum.FALID_BUSINESS;
  error: Error;
}

export interface getBusinessActionType extends AuthActionPattern {
  type: BusinessActionsEnum.GET_BUSINESS;
  deatils: BusinessDetails;
}
