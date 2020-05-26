export interface AuthState {
  error: string;
  loading: boolean;
  isSignIn: boolean;
  isAdmin: boolean;
}

export enum AuthActionsEnum {
  START_POST_BUSINESS = "START_POST_BUSINESS",
  POST_BUSINESS = "POST_BUSINESS",
  SUCCESS_POST_BUSINESS = "SUCCESS_POST_BUSINESS",
  FALID_POST_BUSINESS = "FALID_POST_BUSINESS",
  SIGN_IN = "SIGN_IN",

  START_POST_RESET_PASSWORD = "START_POST_RESET_PASSWORD",
  POST_RESET_PASSWORD = "POST_RESET_PASSWORD",
  SUCCESS_POST_RESET_PASSWORD = "SUCCESS_POST_RESET_PASSWORD",
  FALID_POST_RESET_PASSWORD = "FALID_POST_RESET_PASSWORD",
}

export interface AuthActionPattern {
  type: AuthActionsEnum; //Action Type
}

export interface startPostBusinessActionType extends AuthActionPattern {
  type: AuthActionsEnum.START_POST_BUSINESS;
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
  isAdmin: boolean;
}

export type employeeForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

export type loginEmployeeForm = {
  phone: string;
  password: string;
};

export type resetPasswordEmployeeForm = {
  phone: string;
};

// reset password

export interface startPostResetPasswordActionType extends AuthActionPattern {
  type: AuthActionsEnum.START_POST_RESET_PASSWORD;
}

export interface successPostResetPasswordActionType extends AuthActionPattern {
  type: AuthActionsEnum.SUCCESS_POST_RESET_PASSWORD;
}

export interface faildPostResetPasswordActionType extends AuthActionPattern {
  type: AuthActionsEnum.FALID_POST_RESET_PASSWORD;
  error: Error;
}
