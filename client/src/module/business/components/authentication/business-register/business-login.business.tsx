import React, { useState } from "react";
import BusinessRegisterStyle from "./business-register.module.scss";
import { compose } from "redux";
import { connect } from "react-redux";
import { postBusiness } from "../../../../../store/auth/auth.actions";
import { getLoading, getError } from "../../../../../store/auth/auth.selectors";
import { Service } from "../../../../../models/system/service";
import ManagerLogin from "./components/manager-login/manager-login";
import BusinessRegistration from "./components/business-registration/business-registration";
import Services from "./components/services/services";
import Times from "./components/times/times";
import Timeline from "./components/timeline/timeline";

interface FormState {
  phone: string;
  password: string;
}

interface StateProps {
  loading: boolean;
  error: Error;
}

interface DispatchProps {
  postBusiness: typeof postBusiness;
}

type Props = DispatchProps & StateProps;

const BusinessLogin: React.FC<Props> = (props) => {
  const [Form, setForm] = useState<FormState>({
    phone: "",
    password: "",
  });

  const [Step, setStep] = useState<number>(1);

  const step = (step: "decrement" | "increment") => {
    if (step === "decrement") {
      setStep(Step - 1);
    } else {
      setStep(Step + 1);
    }
  };

  const onChange = (e: any, name: string, value?: any) => {
    if (value) {
      setForm({
        ...Form,
        [name]: e.target.value,
      });
      return;
    }
    setForm({
      ...Form,
      [name]: e.target.value,
    });
  };

  const onSubmit = () => {};

  const { phone, password } = Form;
  const values = { phone, password };

  return (
    <div className={BusinessRegisterStyle.Register}>
      <div className={BusinessRegisterStyle.Timeline}>
        <Timeline step={Step} />
      </div>

      <div className={BusinessRegisterStyle.Form}>
        {Step === 1 && (
          <ManagerLogin step={step} onChange={onChange} values={values} />
        )}

        {Step === 2 && (
          <BusinessRegistration
            step={step}
            onChange={onChange}
            values={values}
          />
        )}

        {Step === 3 && (
          <Services step={step} onChange={onChange} values={values} />
        )}

        {Step === 4 && (
          <Times step={step} onChange={onChange} values={values} />
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
  postBusiness: (form: any) => dispatch(postBusiness(form)),
});

export default compose<any>(
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(BusinessLogin);
