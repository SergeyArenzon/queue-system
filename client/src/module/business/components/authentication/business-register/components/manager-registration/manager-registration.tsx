import React, { memo, useState } from "react";
import { connect } from "react-redux";
import * as language from "../../../../../../../assets/language/language";
import ManagerRegistrationStyle from "./manager-registration.module.scss";
import BusinessRegistrationStyle from "../business-registration/business-registration.module.scss";
import Button from "../../../../../../../models/ui/button/button";
import { registerEmployee } from "../../../../../../../store/business/auth/auth.actions";
import { getLoading, getError } from "../../../../../../../store/business/auth/auth.selectors";
import AuthenticationHeadrer from "../../../shared/authentication-header/authentication-headrer";
import Input from "../../../../../../../models/ui/input/input";
import { validationEmployee } from "../../../../../../../models/validation/employee.validation";
import PhoneValidation from './components/phone-validation/phone-validation'
import { plainText, phone, email, password } from "../../../../../../../models/ui/input/utility/input-types.input";
import { inputChanged } from "../../../../../../../models/ui/input/utility/update-Input.input";

interface OwnProps {
  step: (step: "decrement" | "increment") => void;
}

interface StateProps {
  loading: boolean;
  error: string;
}

interface DispatchProps {
  registerEmployee: typeof registerEmployee;
}
// Become true when user click on next in the first time
let nextPage = false;

type Props = DispatchProps & StateProps & OwnProps;
const ManagerRegistration: React.FC<Props> = (props) => {

  const [Error, setError] = useState<string>("");
  const [Form, setForm] = useState<any>({
    firstName: {
      ...plainText, elementConfig: {
        type: "text",
        placeholder: language.firstName[1],
      },
      value: "",
      label: language.firstName[1],
    },
    lastName: {
      ...plainText, elementConfig: {
        type: "text",
        placeholder: language.lastName[1],
      },
      value: "",
      label: language.lastName[1],
    },
    phone
    , email,
    password
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (e: any, inputIdentifier: any) => {
    const ans = inputChanged(Form, e, inputIdentifier);
    setForm(ans.updatedForm);
    setFormIsValid(ans.formIsValid);
  };
  const [ValidPassword, setValidPassword] = useState<string>("");
  const [CheckPhoneValidation, setCheckPhoneValidation] = useState<boolean>(false);

  const verificationPhone = (verificationCode: string) => {
    console.log('verificationPhone', verificationCode);
    if (verificationCode === "123") {
      props.step('increment');
    }
  }

  // Checks the information in front of the server
  const onClickNext = () => {
    //props.step('increment');
    const error = validationEmployee(EmployeeDetails, ValidPassword);
    if (error) {
      setError(error);
    } else {
      setError("");
      // props.registerEmployee(EmployeeDetails);
      nextPage = true;
    }
  };

  if (!props.loading && nextPage && Error.length <= 1 && !props.error && !CheckPhoneValidation) {
    setCheckPhoneValidation(true);
  }

  return (
    <div className={ManagerRegistrationStyle.Manager}>
      <AuthenticationHeadrer
        title={language.managerHeaderTitle[1]}
        subTitle={language.managerHeaderSubTitle[1]}
        error={Error ? Error : props.error}
      />
      {
        CheckPhoneValidation ?
          <PhoneValidation email={EmployeeDetails.email} onChangePhone={onChange} verificationPhone={verificationPhone} />
          :

          <React.Fragment>
            <div className={ManagerRegistrationStyle.Body}>
              {/* First Name */}
              <Input
                label={language.firstName[1]}
                name="firstname"
                type="text"
                value={EmployeeDetails.firstName}
                onChange={(e) => onChange(e, "firstName")}
                class="border"
              />

              {/* Last Name */}
              <Input
                label={language.lastName[1]}
                name="lastname"
                type="text"
                value={EmployeeDetails.lastName}
                onChange={(e) => onChange(e, "lastName")}
                class="border"
              />

              {/* Phone */}
              <Input
                label={language.phone[1]}
                name="phone"
                type="tel"
                value={EmployeeDetails.phone}
                onChange={(e) => onChange(e, "phone")}
                class="border"
              />

              {/* Email */}
              <Input
                label={language.email[1]}
                name="email"
                type="email"
                value={EmployeeDetails.email}
                onChange={(e) => onChange(e, "email")}
                class="border"
              />

              {/* Password */}
              <Input
                label={language.password[1]}
                name="password"
                type="password"
                value={EmployeeDetails.password}
                onChange={(e) => onChange(e, "password")}
                class="border"
              />

              {/* Confirm Password */}
              <Input
                label={language.confirmPassword[1]}
                name="password"
                type="password"
                value={ValidPassword}
                onChange={(e) => setValidPassword(e.target.value)}
                class="border"
              />
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
          </React.Fragment>
      }
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  registerEmployee: (form: any) => dispatch(registerEmployee(form)),
});


export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ManagerRegistration)
// (
//   memo(ManagerRegistration, (prevProps, nextProps) => {
//     console.log("ManagerRegistration");
//     if (!nextProps.loading && nextPage && Error.length <= 1 && !nextProps.error) {
//       //nextProps.step('increment');
//       //prevProps.openModal();
//       return false;
//     }
//     return false;
//   })
// );
