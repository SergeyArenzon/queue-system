import React, { useState, useEffect } from "react";
import BusinessLoginStyle from "./business-login.module.scss";
import BusinessRegisterStyle from "../business-register/business-register.module.scss";
import ManagerRegistrationStyle from "../business-register/components/manager-registration/manager-registration.module.scss";
import { connect } from "react-redux";
import { getLoading, getError } from "../../../../../store/auth/auth.selectors";
import Button from "../../../../../models/ui/button/button";
import { resetPasswordEmployee } from "../../../../../store/auth/auth.actions";
import { resetPasswordEmployeeForm } from "../../../../../store/auth/auth.types";

import { Route } from "react-router-dom";

interface StateProps {
  loading: boolean;
  error: Error;
}

interface DispatchProps {
  resetPasswordEmployee: typeof resetPasswordEmployee;
}

type Props = DispatchProps & StateProps;
const BusinessLogin: React.FC<Props> = (props) => {
  const [Form, setForm] = useState<resetPasswordEmployeeForm>({
    phone: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const domain = localStorage.getItem("domain");
    console.log(domain, token);
  }, []);

  // Checks the information in front of the server
  const onClickNext = () => {
    const form = {
      phone: Form.phone,
    };
    props.resetPasswordEmployee(form);
    // nextPage = true;
  };

  // if (reset)
  //   return <Route path="/business/resetpassword" component={BusinessLogin} />;
  // if (!props.loading && !props.error && nextPage)
  //   return <div>התחברת בהצלחה</div>;

  return (
    <div className={BusinessRegisterStyle.Register}>
      <div
        className={BusinessRegisterStyle.Form + " " + BusinessLoginStyle.Form}
      >
        <div className={ManagerRegistrationStyle.Header}>
          <p className={ManagerRegistrationStyle.Title}>התחברות עובד</p>
          <p className={ManagerRegistrationStyle.SubTitle}>
            נא הקלד מס טלפון לאיפוס
          </p>
        </div>

        {props.loading && <div>Loading...</div>}
        {!props.loading && (
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
                  onChange={(e) => {
                    setForm({ ...Form, phone: e.target.value });
                  }}
                />
              </div>
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
  resetPasswordEmployee: (form: resetPasswordEmployeeForm) =>
    dispatch(resetPasswordEmployee(form)),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(BusinessLogin);
