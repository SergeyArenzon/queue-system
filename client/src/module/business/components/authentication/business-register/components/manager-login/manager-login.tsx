import React, { useState } from "react";

import { connect } from "react-redux";

import ManagerRegistrationStyle from "../manager-registration/manager-registration.module.scss";
import Button from "../../../../../../../models/ui/button/button";
import { loginEmployee } from "../../../../../../../store/auth/auth.actions";
import { loginEmployeeForm } from "../../../../../../../store/auth/auth.types";

interface Props {
  step: (step: "decrement" | "increment") => void;
  onChange: (e: any, name: string) => void;
  onNextClick: (form: loginEmployeeForm) => void;
  values: any;
}

const ManagerLogin: React.FC<Props> = (props) => {
  const [Errors, setErrors] = useState<any[]>(new Array(7));

  const onClickNextServer = () => {
    const form = {
      phone: props.values.phone,

      password: props.values.password,
    };
    console.log(props.values);

    props.onNextClick(form);
  };
  return (
    <div className={ManagerRegistrationStyle.Manager}>
      <div className={ManagerRegistrationStyle.Header}>
        <p className={ManagerRegistrationStyle.Title}>ההתחברות מנהל</p>
        <p className={ManagerRegistrationStyle.SubTitle}>דף התחברות</p>
      </div>

      <div className={ManagerRegistrationStyle.Body}>
        {/* Phone */}
        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="phone">מספר טלפון *</label>

          <input
            id="phone"
            name="phone"
            required
            type="tel"
            value={props.values.managerPhone}
            placeholder=""
            onChange={(e) => props.onChange(e, "phone")}
          />
          <span
            className={ManagerRegistrationStyle.Error}
            style={Errors[2] ? {} : { display: "none" }}
          >
            <i>{Errors[2]}</i>
          </span>
        </div>

        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="password">סיסמא *</label>

          <input
            id="password"
            name="password"
            required
            type="password"
            value={props.values.password}
            placeholder=""
            onChange={(e) => props.onChange(e, "password")}
          />
          <span
            className={ManagerRegistrationStyle.Error}
            style={Errors[4] ? {} : { display: "none" }}
          >
            <i>{Errors[4]}</i>
          </span>
        </div>
      </div>

      <div
        className={ManagerRegistrationStyle.Buttons}
        onClick={onClickNextServer}
      >
        <Button color="purple-register">send to server</Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onNextClick: (form: loginEmployeeForm) => dispatch(loginEmployee(form)),
  };
};

export default connect(null, mapDispatchToProps)(ManagerLogin);
