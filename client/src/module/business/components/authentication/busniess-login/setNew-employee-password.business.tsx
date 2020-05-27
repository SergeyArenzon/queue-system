import React, { useState } from "react";
import { RouteComponentProps } from "react-router";

import BusinessLoginStyle from "./business-login.module.scss";
import BusinessRegisterStyle from "../business-register/business-register.module.scss";
import ManagerRegistrationStyle from "../business-register/components/manager-registration/manager-registration.module.scss";
import { connect } from "react-redux";
import { getLoading, getError } from "../../../../../store/auth/auth.selectors";
import { setNewPasswordEmployeeForm } from "../../../../../store/auth/auth.types";

import Button from "../../../../../models/ui/button/button";
import { setNewPasswordEmployee } from "../../../../../store/auth/auth.actions";
import AuthenticationHeadrer from "../shared/authentication-header/authentication-headrer";
import * as language from "../../../../../assets/language/language";
import Input from "../../../../../models/ui/input/input";

interface MatchParams {
  token: string;
}
interface Params extends RouteComponentProps<MatchParams> {}

interface StateProps {
  loading: boolean;
  error: string;
}

interface DispatchProps {
  setNewPasswordEmployee: typeof setNewPasswordEmployee;
}

const input = {
  password: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Password",
    },
    value: "",
    label: language.password[1],
    name: "password",
    validation: {
      required: true,
      minLength: 6,
    },
    valid: false,
    touched: false,
  },
};

// style={{ marginTop: "10px" }}
// label={language.password[1]}
// name="password"
// type="password"
// value={Form.password}
// key={formElement.id}
// elementType={formElement.config.elementType}
// elementConfig={formElement.config.elementConfig}
// value={formElement.config.value}
// invalid={!formElement.config.valid}
// shouldValidate={formElement.config.validation}
// touched={formElement.config.touched}

type Props = DispatchProps & StateProps & Params;
const ResetEmployeePassword: React.FC<Props> = (props) => {
  const [Form, setForm] = useState<setNewPasswordEmployeeForm>({
    password: "",
    confirmPassword: "",
  });

  const onClickNext = () => {
    // if(valida)
    const token = props.match.params.token;
    console.log(Form);

    // props.setNewPasswordEmployee(Form, token);
  };

  return (
    <div className={BusinessRegisterStyle.Register}>
      <div
        className={BusinessRegisterStyle.Form + " " + BusinessLoginStyle.Form}
      >
        <AuthenticationHeadrer
          title={language.restPasswordTitle[1]}
          subTitle={language.restPasswordSubTitle[1]}
          error={props.error}
        />

        {props.loading && <div>Loading...</div>}

        {!props.loading && (
          <React.Fragment>
            {props.error}

            <div className={ManagerRegistrationStyle.Body}>
              {/* password */}
              <Input
                style={{ marginTop: "10px" }}
                label={language.password[1]}
                name="password"
                type="password"
                value={Form.password}
                onChange={(e) => setForm({ ...Form, password: e.target.value })}
                // key={input.password.id}
                // elementType={input.password.config.elementType}
                // elementConfig={formElement.config.elementConfig}
                // value={formElement.config.value}
                // invalid={!formElement.config.valid}
                // shouldValidate={formElement.config.validation}
                // touched={formElement.config.touched}
              />
              {/* confirmPassword */}
              <Input
                style={{ marginTop: "10px" }}
                label={language.password[1]}
                name="password"
                type="password"
                value={Form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...Form, confirmPassword: e.target.value })
                }
              />
            </div>

            <div onClick={onClickNext} className={BusinessLoginStyle.Button}>
              <Button color="purple-register">שלח קוד איפוס</Button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  setNewPasswordEmployee: (form: setNewPasswordEmployeeForm, token: string) =>
    dispatch(setNewPasswordEmployee(form, token)),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ResetEmployeePassword);
