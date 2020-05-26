import React, { memo, useState } from "react";
import BusinessRegistrationStyle from "./business-registration.module.scss";
import ManagerRegistrationStyle from "../manager-registration/manager-registration.module.scss";
import * as language from "../../../../../../../assets/language/language";
import Button from "../../../../../../../models/ui/button/button";
import { AiOutlineLink } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import {
  getError,
  getLoading,
} from "../../../../../../../store/business/business.selectors";
import { connect } from "react-redux";
import { registerBusiness } from "../../../../../../../store/business/business.actions";
import { businessForm } from "../../../../../../../store/business/business.types";
import AuthenticationHeadrer from "../../../shared/authentication-header/authentication-headrer";
import Input from "../../../../../../../models/ui/input/input";
import InputStyle from "../../../../../../../models/ui/input/input.module.scss";

interface OwnProps {
  step: (step: "decrement" | "increment") => void;
  onChange: (e: any, name: string, value?: any) => void;
  values: any;
}

interface StateProps {
  loading: boolean;
  error: string;
}

interface DispatchProps {
  registerBusiness: typeof registerBusiness;
}

// Become true when user click on next in the first time
let nextPage = false;

type Props = DispatchProps & StateProps & OwnProps;
const BusinessRegistration: React.FC<Props> = (props) => {
  const [Error, setError] = useState<string>("");

  const changeLinks = (e: any, name: string) => {
    const links = props.values.socialMediaLinks;
    links[name] = e.target.value;
    props.onChange(e, "socialMediaLinks", links);
  };

  // Checks the information in front of the server
  const onClickNext = () => {
    // props.step('increment');
    const phone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    const url = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

    if (!phone.test(props.values.businessPhone)) {
      setError(language.phoneError[1]);
    } else if (
      (!url.test(props.values.socialMediaLinks["website"]) &&
        props.values.socialMediaLinks["website"]) ||
      (!url.test(props.values.socialMediaLinks["facebook"]) &&
        props.values.socialMediaLinks["facebook"]) ||
      (!url.test(props.values.socialMediaLinks["instagram"]) &&
        props.values.socialMediaLinks["instagram"])
    ) {
      setError(language.urlError[1]);
    } else {
      setError("");
      const form: businessForm = {
        name: props.values.businessName,
        address: props.values.businessAddress,
        phone: props.values.businessPhone,
        email: props.values.businessEmail,
        logo: props.values.logo,
        links: props.values.socialMediaLinks,
        about: props.values.about,
        domain: props.values.domain,
      };
      props.registerBusiness(form);
      nextPage = true;
    }
  };

  return (
    <div className={BusinessRegistrationStyle.Business}>
      <AuthenticationHeadrer
        title={language.businessHeaderTitle[1]}
        subTitle={language.businessHeaderSubTitle[1]}
        error={Error ? Error : props.error}
      />

      <div className={ManagerRegistrationStyle.Body}>
        {/* Busniess Name */}
        <Input
          label={language.businessName[1]}
          name="businessname"
          type="text"
          value={props.values.businessName}
          onChange={(e) => props.onChange(e, "businessName")}
        />

        {/* Address */}
        <Input
          label={language.address[1]}
          name="businessAddress"
          type="text"
          value={props.values.businessAddress}
          onChange={(e) => props.onChange(e, "businessAddress")}
        />

        {/* Business Phone */}
        <Input
          label={language.phone[1]}
          name="businessPhone"
          type="tel"
          value={props.values.businessPhone}
          onChange={(e) => props.onChange(e, "businessPhone")}
        />

        {/* Email */}
        <Input
          label={language.email[1]}
          name="businessEmail"
          type="email"
          value={props.values.businessEmail}
          onChange={(e) => props.onChange(e, "businessEmail")}
        />

        {/* About */}
        <div className={InputStyle.Input}>
          <label htmlFor="about">{language.about[1]}</label>
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
              placeholder={" " + language.website[1]}
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
              placeholder={" " + language.facebook[1]}
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
              placeholder={" " + language.instagram[1]}
              onChange={(e) => changeLinks(e, "instagram")}
            />
          </div>
        </div>
      </div>

      {!props.loading ? (
        <div className={BusinessRegistrationStyle.Buttons}>
          <Button onClick={() => props.step("decrement")} color="orange">
            {language.back[1]}
          </Button>
          <Button onClick={onClickNext} color="purple-register">
            {language.next[1]}
          </Button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  registerBusiness: (form: businessForm) => dispatch(registerBusiness(form)),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(
  memo(BusinessRegistration, (prevProps, nextProps) => {
    console.log("ManagerRegistration");
    if (
      !nextProps.loading &&
      !nextProps.error &&
      nextPage &&
      Error.length <= 1
    ) {
      nextProps.step("increment");
      return true;
    }
    return false;
  })
);
