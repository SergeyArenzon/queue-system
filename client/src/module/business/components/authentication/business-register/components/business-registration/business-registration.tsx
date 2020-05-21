import React, { useState } from "react";
import BusinessRegistrationStyle from "./business-registration.module.scss";
import ManagerRegistrationStyle from "../manager-registration/manager-registration.module.scss";
import Button from "../../../../../../../models/ui/button/button";
import { AiOutlineLink } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { getError, getLoading } from "../../../../../../../store/auth/auth.selectors";
import { connect } from "react-redux";
import { registerBusiness } from "../../../../../../../store/auth/auth.actions";
import { newBusinessForm } from "../../../../../../../store/auth/auth.types";

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
  registerBusiness: typeof registerBusiness;
}

// Become true when user click on next in the first time
let nextPage = false;

type Props = DispatchProps & StateProps & OwnProps;
const BusinessRegistration: React.FC<Props> = (props) => {
  const links = props.values.socialMediaLinks;

  const changeLinks = (e: any, name: string) => {
    links[name] = e.target.value;
    props.onChange(e, "socialMediaLinks", links);
  };

  // Checks the information in front of the server
  const onClickNext = () => {
    props.step('increment');
    const form: newBusinessForm = {
      name: props.values.businessName,
      address: props.values.businessAddress,
      phone: props.values.businessPhone,
      email: props.values.businessEmail,
      logo: props.values.logo,
      links: props.values.socialMediaLinks,
      about: props.values.about
    };
    props.registerBusiness(form);
    nextPage = true;
  };

  if (!props.loading && !props.error && nextPage) props.step('increment');
  //if (props.loading) return <div>Loading...</div>;


  return (
    <div className={BusinessRegistrationStyle.Business}>
      <div className={ManagerRegistrationStyle.Header}>
        <p className={ManagerRegistrationStyle.Title}>הרשמת עסק</p>
        <p className={ManagerRegistrationStyle.SubTitle}>
          הפרטים בדף זה הם של העסק שלך.
        </p>
      </div>

      {props.error && <p className={ManagerRegistrationStyle.Error}>{props.error}</p>}

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
  registerBusiness: (form: newBusinessForm) => dispatch(registerBusiness(form))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(BusinessRegistration);
