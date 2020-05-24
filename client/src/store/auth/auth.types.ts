export interface AuthState {
  error: string;
  loading: boolean;
  isSignIn: boolean;
  isAdmin: boolean
}

export enum AuthActionsEnum {
  START_POST_BUSINESS = "START_POST_BUSINESS",
  POST_BUSINESS = "POST_BUSINESS",
  SUCCESS_POST_BUSINESS = "SUCCESS_POST_BUSINESS",
  FALID_POST_BUSINESS = "FALID_POST_BUSINESS",
  SIGN_IN = "SIGN_IN"
}

export interface AuthActionPattern {
  type: AuthActionsEnum; //Action Type
}

export interface startPostBusinessActionType extends AuthActionPattern {
  type: AuthActionsEnum.START_POST_BUSINESS;
}

export interface postBusinessActionType extends AuthActionPattern {
  type: AuthActionsEnum.POST_BUSINESS;
  form: businessForm;
}

export interface successPostBusinesActionType extends AuthActionPattern {
  type: AuthActionsEnum.SUCCESS_POST_BUSINESS;
}

export interface faildPostBusinesActionType extends AuthActionPattern {
  type: AuthActionsEnum.FALID_POST_BUSINESS;
  error: Error;
}

export interface signInActionType extends AuthActionPattern {
  type: AuthActionsEnum.SIGN_IN;
  ans: boolean;
}



export type employeeForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

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

export type loginEmployeeForm = {
  phone: string;
  password: string;
};
