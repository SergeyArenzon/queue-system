export interface BusinessState {
  error: string;
  loading: boolean;
  deatils: businessForm | null
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
  form: businessForm;
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
  deatils: businessForm;
}

export type businessForm = {
  id?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  about: string;
  links: { [key: string]: string };
  logo?: string;
  domain: string;
  hours?: businesHourForm
};

export type businesHourForm = {
  [day: string]: { start: string; end: string }[];
};
