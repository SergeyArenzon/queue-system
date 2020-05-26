export interface BusinessState {
  error: string;
  loading: boolean;
}

export enum BusinessActionsEnum {
  START_POST_BUSINESS = "START_POST_BUSINESS",
  POST_BUSINESS = "POST_BUSINESS",
  SUCCESS_POST_BUSINESS = "SUCCESS_POST_BUSINESS",
  FALID_POST_BUSINESS = "FALID_POST_BUSINESS",
}

export interface AuthActionPattern {
  type: BusinessActionsEnum; //Action Type
}

export interface startPostBusinessActionType extends AuthActionPattern {
  type: BusinessActionsEnum.START_POST_BUSINESS;
}

export interface postBusinessActionType extends AuthActionPattern {
  type: BusinessActionsEnum.POST_BUSINESS;
  form: businessForm;
}

export interface successPostBusinesActionType extends AuthActionPattern {
  type: BusinessActionsEnum.SUCCESS_POST_BUSINESS;
}

export interface faildPostBusinesActionType extends AuthActionPattern {
  type: BusinessActionsEnum.FALID_POST_BUSINESS;
  error: Error;
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
};

export type businesHourForm = {
  [day: string]: { start: string; end: string }[];
};
