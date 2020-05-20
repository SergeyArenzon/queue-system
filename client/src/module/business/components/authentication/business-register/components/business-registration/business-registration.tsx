import React, { useState } from "react";
import BusinessRegistrationStyle from "./business-registration.module.scss";
import ManagerRegistrationStyle from "../manager-registration/manager-registration.module.scss";
import Button from "../../../../../../../models/ui/button/button";
import { AiOutlineLink } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { getError, getLoading } from "../../../../../../../store/auth/auth.selectors";
import { connect } from "react-redux";

interface OwnProps {
  step: (step: 'decrement' | 'increment') => void,
  onChange: (e: any, name: string, value?: any) => void,
  values: any
}

interface StateProps {
  loading: boolean;
  error: Error
}

interface DispatchProps {
}

// Become true when user click on next in the first time
let nextPage = false;

type Props = DispatchProps & StateProps & OwnProps;
const BusinessRegistration: React.FC<Props> = (props) => {
  const [Errors, setErrors] = useState<any[]>(new Array(7));
  const links = props.values.socialMediaLinks;

  const changeLinks = (e: any, name: string) => {
    links[name] = e.target.value;
    props.onChange(e, "socialMediaLinks", links);
  };

  const onClickNext = () => {
    props.step("increment"); //// Delete for validation

    const temp = [...Errors];
    const urlValidation = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (props.values.businessName.length < 2) {
      temp[0] = "שם חייב להכיל לפחות 2 אותיות";
      setErrors(temp);
    } else if (props.values.businessAddress.length < 2) {
      temp[1] = "כתובת חייבת להכיל לפחות 7 תווים";
      setErrors(temp);
    } else if (!props.values.businessPhone.match(/\d/g)) {
      temp[2] = "טלפון יכול להכיל רק מספרים";
      setErrors(temp);
    } else if (!props.values.businessEmail.match(/\S+@\S+\.\S+/)) {
      temp[3] = "אימייל לא תקין";
      setErrors(temp);
    } else if (
      (props.values.socialMediaLinks["website"] &&
        !props.values.socialMediaLinks["website"].match(urlValidation)) ||
      (props.values.socialMediaLinks["facebook"] &&
        !props.values.socialMediaLinks["facebook"].match(urlValidation)) ||
      (props.values.socialMediaLinks["instagram"] &&
        !props.values.socialMediaLinks["instagram"].match(urlValidation))
    ) {
      temp[4] = "קישור לא תקין";
      setErrors(temp);
    } else {
      props.step("increment");
      return;
    }
    setTimeout(() => {
      setErrors(new Array(7));
    }, 3000);
  };

  return (
    <div className={BusinessRegistrationStyle.Business}>
      <div className={ManagerRegistrationStyle.Header}>
        <p className={ManagerRegistrationStyle.Title}>הרשמת עסק</p>
        <p className={ManagerRegistrationStyle.SubTitle}>
          הפרטים בדף זה הם של העסק שלך.
        </p>
      </div>

      <div className={ManagerRegistrationStyle.Body}>
        {/* Busniess Name */}
        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="businessname">שם *</label>

          <input
            id="businessname"
            name="businessname"
            required={true}
            type="text"
            value={props.values.businessName}
            placeholder=""
            onChange={(e) => props.onChange(e, "businessName")}
          />
          <span
            className={ManagerRegistrationStyle.Error}
            style={Errors[0] ? {} : { display: "none" }}
          >
            <i>{Errors[0]}</i>
          </span>
        </div>

        {/* Address */}
        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="businessAddress">כתובת *</label>

          <input
            id="businessAddress"
            name="businessAddress"
            required={true}
            type="text"
            value={props.values.businessAddress}
            placeholder=""
            onChange={(e) => props.onChange(e, "businessAddress")}
          />
          <span
            className={ManagerRegistrationStyle.Error}
            style={Errors[1] ? {} : { display: "none" }}
          >
            <i>{Errors[1]}</i>
          </span>
        </div>

        {/* Business Phone */}
        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="businessPhone">טלפון*</label>

          <input
            id="businessPhone"
            name="businessPhone"
            required={true}
            type="tel"
            value={props.values.businessPhone}
            placeholder=""
            onChange={(e) => props.onChange(e, "businessPhone")}
          />
          <span
            className={ManagerRegistrationStyle.Error}
            style={Errors[2] ? {} : { display: "none" }}
          >
            <i>{Errors[2]}</i>
          </span>
        </div>

        {/* Email */}
        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="businessEmail">אימייל*</label>

          <input
            id="businessEmail"
            name="businessEmail"
            required={true}
            type="email"
            value={props.values.businessEmail}
            placeholder=""
            onChange={(e) => props.onChange(e, "businessEmail")}
          />
          <span
            className={ManagerRegistrationStyle.Error}
            style={Errors[3] ? {} : { display: "none" }}
          >
            <i>{Errors[3]}</i>
          </span>
        </div>

        {/* About */}
        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="about">על העסק</label>

          <textarea
            id="about"
            name="about"
            value={props.values.about}
            style={{ height: "100px" }}
            onChange={(e) => props.onChange(e, "about")}
          />
          <span
            className={ManagerRegistrationStyle.Error}
            style={Errors[4] ? {} : { display: "none" }}
          >
            <i>{Errors[4]}</i>
          </span>
        </div>

        {/* Links */}
        <div className={BusinessRegistrationStyle.Links}>
          <div className={BusinessRegistrationStyle.Link}>
            <AiOutlineLink />
            <input
              type="url"
              name="website"
              id="website"
              value={props.values.socialMediaLinks["website"]}
              placeholder=" אתר העסק"
              onChange={(e) => changeLinks(e, "website")}
            />
          </div>

          <div className={BusinessRegistrationStyle.Link}>
            <FaFacebookF />
            <input
              type="url"
              name="facebook"
              id="facebook"
              value={props.values.socialMediaLinks["facebook"]}
              placeholder=" פייסבוק"
              onChange={(e) => changeLinks(e, "facebook")}
            />
          </div>

          <div className={BusinessRegistrationStyle.Link}>
            <FaInstagram />
            <input
              type="url"
              name="instagram"
              id="instagram"
              value={props.values.socialMediaLinks["instagram"]}
              placeholder=" אינסטגרם"
              onChange={(e) => changeLinks(e, "instagram")}
            />
          </div>
          <span
            className={ManagerRegistrationStyle.Error}
            style={Errors[5] ? {} : { display: "none" }}
          >
            <i>{Errors[5]}</i>
          </span>
        </div>
      </div>

      <div className={BusinessRegistrationStyle.Buttons}>
        <Button onClick={() => props.step("decrement")} color="orange">
          חזור
        </Button>
        <Button onClick={onClickNext} color="purple-register">
          המשך
        </Button>
      </div>
    </div>
  );
};


const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state)
});

const mapDispatchToProps = (dispatch: any) => ({

});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(BusinessRegistration);
