export interface AuthState {
  error: string;
  loading: boolean;
  isSignIn: boolean;
  isAdmin: boolean;
}

export enum AuthActionsEnum {
  START_POST_AUTH = "START_POST_AUTH",
  POST_AUTH = "POST_AUTH",
  SUCCESS_POST_AUTH = "SUCCESS_POST_AUTH",
  FALID_POST_AUTH = "FALID_POST_AUTH",
  SIGN_IN = "SIGN_IN",

  START_POST_RESET_PASSWORD = "START_POST_RESET_PASSWORD",
  POST_RESET_PASSWORD = "POST_RESET_PASSWORD",
  SUCCESS_POST_RESET_PASSWORD = "SUCCESS_POST_RESET_PASSWORD",
  FALID_POST_RESET_PASSWORD = "FALID_POST_RESET_PASSWORD",
}

export interface AuthActionPattern {
  type: AuthActionsEnum; //Action Type
}

export interface startPostAuthActionType extends AuthActionPattern {
  type: AuthActionsEnum.START_POST_AUTH;
}

export interface successPostAuthActionType extends AuthActionPattern {
  type: AuthActionsEnum.SUCCESS_POST_AUTH;
}

export interface faildPostAuthActionType extends AuthActionPattern {
  type: AuthActionsEnum.FALID_POST_AUTH;
  error: Error;
}

export interface signInActionType extends AuthActionPattern {
  type: AuthActionsEnum.SIGN_IN;
  ans: boolean;
  isAdmin: boolean;
}

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
