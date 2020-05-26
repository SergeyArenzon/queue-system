import React, { memo, useState } from "react";
import { connect } from "react-redux";
import * as language from '../../../../../../../assets/language/language'
import ManagerRegistrationStyle from "./manager-registration.module.scss";
import BusinessRegistrationStyle from "../business-registration/business-registration.module.scss";
import Button from "../../../../../../../models/ui/button/button";
import { registerEmployee } from "../../../../../../../store/auth/auth.actions";
import { getLoading, getError } from "../../../../../../../store/auth/auth.selectors";
import AuthenticationHeadrer from "../../../shared/authentication-header/authentication-headrer";
import Input from "../../../../../../../models/ui/input/input";

interface OwnProps {
  step: (step: "decrement" | "increment") => void;
  onChange: (e: any, name: string) => void;
  values: any;
}

interface StateProps {
  loading: boolean;
  error: string
}

interface DispatchProps {
  registerEmployee: typeof registerEmployee
}
// Become true when user click on next in the first time
let nextPage = false;

type Props = DispatchProps & StateProps & OwnProps;
const ManagerRegistration: React.FC<Props> = (props) => {
  const [Error, setError] = useState<string>("");

  // Checks the information in front of the server
  const onClickNext = () => {
    //props.step('increment');
    const phone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;

    if (props.values.password !== props.values.validatePassword) {
      setError(language.confirmPasswordError[1]);
    }
    else if (!phone.test(props.values.managerPhone)) {
      setError(language.phoneError[1]);
    }
    else {
      setError("");
      const form = {
        firstName: props.values.managerFirstName,
        lastName: props.values.managerLastName,
        phone: props.values.managerPhone,
        email: props.values.managerEmail,
        password: props.values.password,
      };
      props.registerEmployee(form);
      nextPage = true;
    }

  };

  return (
    <div className={ManagerRegistrationStyle.Manager}>
      <AuthenticationHeadrer title={language.managerHeaderTitle[1]} subTitle={language.managerHeaderSubTitle[1]}
        error={Error ? Error : props.error} />

      <div className={ManagerRegistrationStyle.Body}>
        {/* First Name */}
        <Input label={language.firstName[1]} name="firstname" type="text"
          value={props.values.managerFirstName} onChange={(e) => props.onChange(e, 'managerFirstName')} />

        {/* Last Name */}
        <Input label={language.lastName[1]} name="lastname" type="text"
          value={props.values.managerLastName} onChange={(e) => props.onChange(e, 'managerLastName')} />

        {/* Phone */}
        <Input label={language.phone[1]} name="phone" type="tel"
          value={props.values.managerPhone} onChange={(e) => props.onChange(e, 'managerPhone')} />

        {/* Email */}
        <Input label={language.email[1]} name="email" type="email"
          value={props.values.managerEmail} onChange={(e) => props.onChange(e, 'managerEmail')} />

        {/* Password */}
        <Input label={language.password[1]} name="password" type="password"
          value={props.values.password} onChange={(e) => props.onChange(e, 'password')} />

        {/* Confirm Password */}
        <Input label={language.confirmPassword[1]} name="password" type="password"
          value={props.values.validatePassword} onChange={(e) => props.onChange(e, 'validatePassword')} />
      </div>

      {!props.loading ?
        <div className={BusinessRegistrationStyle.Buttons}>
          <Button onClick={() => props.step("decrement")} color="orange">
            {language.back[1]}
          </Button>
          <Button onClick={onClickNext} color="purple-register">
            {language.next[1]}
          </Button>
        </div>
        :
        <div>Loading...</div>
      }
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  registerEmployee: (form: any) => dispatch(registerEmployee(form))

});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(memo(ManagerRegistration,
  (prevProps, nextProps) => {
    console.log('ManagerRegistration');
    if (!nextProps.loading && !nextProps.error && nextPage && Error.length <= 1) {
      nextProps.step('increment');
      return true;
    }
    return false;
  }));
