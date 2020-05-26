import React, { useState, useEffect } from "react";
import BusinessLoginStyle from './business-login.module.scss';
import BusinessRegisterStyle from '../business-register/business-register.module.scss';
import ManagerRegistrationStyle from "../business-register/components/manager-registration/manager-registration.module.scss";
import { connect } from "react-redux";
import { getLoading, getError } from "../../../../../store/auth/auth.selectors";
import Button from "../../../../../models/ui/button/button";
import { loginEmployee } from "../../../../../store/auth/auth.actions";
import AuthenticationHeadrer from "../shared/authentication-header/authentication-headrer";
import * as language from '../../../../../assets/language/language'
import Input from "../../../../../models/ui/input/input";

interface FormState {
  phone: string;
  password: string;
}

interface StateProps {
  loading: boolean;
  error: string;
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
  const [Error, setError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const domain = localStorage.getItem("domain");
    console.log(domain, token);

  }, [])

  // Checks the information in front of the server
  const onClickNext = () => {
    const phone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (!phone.test(Form.phone)) {
      setError(language.phoneError[1]);
    }
    else {
      setError("");
      props.loginEmployee(Form);
      nextPage = true;
    }
  };

  if (!props.loading && !props.error && nextPage) return <div>התחברת בהצלחה</div>

  return (
    <div className={BusinessRegisterStyle.Register}>
      <div className={BusinessRegisterStyle.Form + " " + BusinessLoginStyle.Form} >
        <AuthenticationHeadrer title={language.loginTitle[1]} subTitle={language.loginSubTitle[1]}
          error={Error ? Error : props.error} />

        <React.Fragment>
          <div className={ManagerRegistrationStyle.Body}>
            {/* Phone */}
            <Input label={language.phone[1]} name="phone" type="tel"
              value={Form.phone} onChange={(e) => setForm({ ...Form, 'phone': e.target.value })} />

            {/* Password */}
            <Input label={language.password[1]} name="password" type="password"
              value={Form.password} onChange={(e) => setForm({ ...Form, 'password': e.target.value })} />
          </div>
          {!props.loading ?
            <div onClick={onClickNext} className={BusinessLoginStyle.Button}>
              <Button color='purple-register'>התחבר</Button>
            </div>
            :
            <div>Loading...</div>
          }
        </React.Fragment>

      </div>
    </div>
  )
};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  loginEmployee: (form: FormState) => dispatch(loginEmployee(form))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(BusinessLogin);