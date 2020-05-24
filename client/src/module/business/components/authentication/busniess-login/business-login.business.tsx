import React, { useState } from "react";
import BusinessLoginStyle from './business-login.module.scss';
import BusinessRegisterStyle from '../business-register/business-register.module.scss';
import ManagerRegistrationStyle from "../business-register/components/manager-registration/manager-registration.module.scss";
import { connect } from "react-redux";
import { getLoading, getError } from "../../../../../store/auth/auth.selectors";
import Button from "../../../../../models/ui/button/button";
import { loginEmployee } from "../../../../../store/auth/auth.actions";

interface FormState {
  phone: string;
  password: string;
}

interface StateProps {
  loading: boolean;
  error: Error;
}

interface DispatchProps {
  loginEmployee: typeof loginEmployee;
}

// Become true when user click on next in the first time
let nextPage = false;

type Props = DispatchProps & StateProps;
const BusinessLogin: React.FC<Props> = (props) => {
  const [Form, setForm] = useState<FormState>({
    phone: "",
    password: "",
  });

  const [Domain, setDomain] = useState('');
  // Checks the information in front of the server
  const onClickNext = () => {
    const form = {
      phone: Form.phone,
      password: Form.password
    };
    props.loginEmployee(form, Domain);
    nextPage = true;
  };

  if (!props.loading && !props.error && nextPage) return <div>התחברת בהצלחה</div>


  return (
    <div className={BusinessRegisterStyle.Register}>
      <div className={BusinessRegisterStyle.Form + " " + BusinessLoginStyle.Form} >
        <div className={ManagerRegistrationStyle.Header}>
          <p className={ManagerRegistrationStyle.Title}>התחברות עובד</p>
          <p className={ManagerRegistrationStyle.SubTitle}>
            ברוך שובך למערכת, נא הכנס את פרטי ההתחברות שלך.
        </p>
        </div>

        {props.loading && <div>Loading...</div>}
        {!props.loading &&
          <React.Fragment>
            {props.error}
            <div className={ManagerRegistrationStyle.Body}>
              {/* Phone */}
              <div className={ManagerRegistrationStyle.Field}>
                <label htmlFor="phone">מספר טלפון *</label>

                <input
                  id="phone"
                  name="phone"
                  required
                  type="tel"
                  value={Form.phone}
                  placeholder=""
                  onChange={(e) => { setForm({ ...Form, 'phone': e.target.value }) }}
                />
              </div>

              {/* Domain */}
              <div className={ManagerRegistrationStyle.Field}>
                <label htmlFor="domain">דומיין *</label>

                <input
                  id="domain"
                  name="domain"
                  required
                  type="text"
                  value={Domain}
                  placeholder=""
                  onChange={(e) => { setDomain(e.target.value) }}
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
                  value={Form.password}
                  placeholder=""
                  onChange={(e) => { setForm({ ...Form, 'password': e.target.value }) }}
                />
              </div>
            </div>

            <div onClick={onClickNext} className={BusinessLoginStyle.Button}>
              <Button color='purple-register'>התחבר</Button>
            </div>
          </React.Fragment>
        }
      </div>
    </div>
  )


};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  loginEmployee: (form: FormState, domain: string) => dispatch(loginEmployee(form, domain))
}); 

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(BusinessLogin);