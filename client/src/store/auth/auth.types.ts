export interface AuthState {
  error: string;
  loading: boolean;
  isSignIn: boolean;
  isAdmin: boolean;
}

export enum AuthActionsEnum {
  START_AUTH = "START_AUTH",
  FALID_AUTH = "FALID_AUTH",
  SUCCESS_POST_AUTH = "SUCCESS_POST_AUTH",
  SUCCESS_POST_RESET_PASSWORD = "SUCCESS_POST_RESET_PASSWORD",
  SUCCESS_POST_SET_NEW_PASSWORD = "SUCCESS_POST_SET_NEW_PASSWORD",
  SIGN_IN_CHECK = "SIGN_IN_CHECK"
}

export interface AuthActionPattern {
  type: AuthActionsEnum; //Action Type
}

export interface startAuthActionType extends AuthActionPattern {
  type: AuthActionsEnum.START_AUTH;
}

export interface successPostAuthActionType extends AuthActionPattern {
  type: AuthActionsEnum.SUCCESS_POST_AUTH;
}

export interface faildAuthActionType extends AuthActionPattern {
  type: AuthActionsEnum.FALID_AUTH;
  error: Error;
}

export interface signInCheckActionType extends AuthActionPattern {
  type: AuthActionsEnum.SIGN_IN_CHECK;
  ans: boolean;
  isAdmin: boolean;
}

export interface successPostResetPasswordActionType extends AuthActionPattern {
  type: AuthActionsEnum.SUCCESS_POST_RESET_PASSWORD;
}


export interface successPostSetNewPasswordActionType extends AuthActionPattern {
  type: AuthActionsEnum.SUCCESS_POST_SET_NEW_PASSWORD;
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

export type setNewPasswordEmployeeForm = {
  password: string;
  confirmPassword: string;
};
