import React from "react";
import { connect } from "react-redux";
import ManagerRegistrationStyle from "./manager-registration.module.scss";
import Button from "../../../../../../../models/ui/button/button";
import { registerManager } from "../../../../../../../store/auth/auth.actions";
import { getLoading, getError } from "../../../../../../../store/auth/auth.selectors";

interface OwnProps {
  step: (step: "decrement" | "increment") => void;
  onChange: (e: any, name: string) => void;
  values: any;
}

interface StateProps {
  loading: boolean;
  error: Error
}

interface DispatchProps {
  registerManager: typeof registerManager
}
// Become true when user click on next in the first time
let nextPage = false;

type Props = DispatchProps & StateProps & OwnProps;
const ManagerRegistration: React.FC<Props> = (props) => {

  // Checks the information in front of the server
  const onClickNext = () => {
    props.step('increment');
    const form = {
      firstName: props.values.managerFirstName,
      lastName: props.values.managerLastName,
      phone: props.values.managerPhone,
      email: props.values.managerEmail,
      password: props.values.password,
    };
    props.registerManager(form);
    nextPage = true;
  };

  if (props.loading) return <div>Loading...</div>;
  if (!props.loading && !props.error && nextPage) props.step('increment');


  return (
    <div className={ManagerRegistrationStyle.Manager}>
      <div className={ManagerRegistrationStyle.Header}>
        <p className={ManagerRegistrationStyle.Title}>הרשמת מנהל</p>
        <p className={ManagerRegistrationStyle.SubTitle}>
          הפרטים שתמלא בדף זה, יהיו פרטי ההתחברות שלך למערכת בעתיד.
        </p>
      </div>

      {props.error && <p className={ManagerRegistrationStyle.Error}>{props.error}</p>}

      <div className={ManagerRegistrationStyle.Body}>
        {/* First Name */}
        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="firstname">שם פרטי *</label>
          <input
            pattern="[A-Za-z]{3}"
            id="firstname"
            name="firstname"
            required={true}
            type="text"
            value={props.values.managerFirstName}
            placeholder=""
            onChange={(e) => props.onChange(e, "managerFirstName")}
          />
        </div>

        {/* Last Name */}
        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="lastname">שם משפחה *</label>

          <input
            id="lastname"
            name="lastname"
            required={true}
            type="text"
            value={props.values.managerLastName}
            placeholder=""
            onChange={(e) => props.onChange(e, "managerLastName")}
          />
        </div>

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
            onChange={(e) => props.onChange(e, "managerPhone")}
          />
        </div>

        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="email">אימייל *</label>

          <input
            id="email"
            name="email"
            required
            type="email"
            value={props.values.managerEmail}
            placeholder=""
            onChange={(e) => {
              props.onChange(e, "managerEmail");
            }}
          />
        </div>

        {/* Password */}
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
        </div>

        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="validatePassword">וודא סיסמא *</label>

          <input
            id="validatePassword"
            name="validatePassword"
            required
            type="password"
            value={props.values.validatePassword}
            placeholder=""
            onChange={(e) => {
              props.onChange(e, "validatePassword");
            }}
          />
        </div>
      </div>

      <div className={ManagerRegistrationStyle.Buttons} onClick={onClickNext}>
        <Button color="purple-register">המשך</Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  registerManager: (form: any) => dispatch(registerManager(form))

});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ManagerRegistration);
