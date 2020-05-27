import React, { useState } from "react";
import BusinessLoginStyle from "./business-login.module.scss";
import BusinessRegisterStyle from "../business-register/business-register.module.scss";
import ManagerRegistrationStyle from "../business-register/components/manager-registration/manager-registration.module.scss";
import { connect } from "react-redux";
import { getLoading, getError } from "../../../../../store/auth/auth.selectors";
import Button from "../../../../../models/ui/button/button";
import { resetPasswordEmployee } from "../../../../../store/auth/auth.actions";
import AuthenticationHeadrer from "../shared/authentication-header/authentication-headrer";
import * as language from "../../../../../assets/language/language";
import Input from "../../../../../models/ui/input/input";

interface StateProps {
  loading: boolean;
  error: string;
}

interface DispatchProps {
  resetPasswordEmployee: typeof resetPasswordEmployee;
}

type Props = DispatchProps & StateProps;
const ResetEmployeePassword: React.FC<Props> = (props) => {
  const [Phone, setPhone] = useState<string>("");

  const onClickNext = () => {
    props.resetPasswordEmployee(Phone);
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
              {/* Phone */}
              <Input
                style={{ width: "50%", marginTop: "10px" }}
                label={language.phone[1]}
                name="phone"
                type="tel"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
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
  resetPasswordEmployee: (phone: string) => dispatch(resetPasswordEmployee(phone)),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ResetEmployeePassword);
