import React, { memo, useState } from "react";
import BusinessRegistrationStyle from "./business-registration.module.scss";
import ManagerRegistrationStyle from "../manager-registration/manager-registration.module.scss";
import * as language from "../../../../../../../assets/language/language";
import Button from "../../../../../../../models/ui/button/button";
import {
  getError,
  getLoading,
} from "../../../../../../../store/business/details/details.selectors";
import { connect } from "react-redux";
import AuthenticationHeadrer from "../../../shared/authentication-header/authentication-headrer";
import Input from "../../../../../../../models/ui/input/input";
import { BusinessDetails } from "../../../../../../../models/system/business-details";
import SocialMediaLinks from "./components/social-media-links/social-media-links";
import { postDetails } from "../../../../../../../store/business/details/details.actions";
import { password, phone, plainText, email, domain } from "../../../../../../../models/ui/input/utility/input-types.input";
import { inputChanged } from "../../../../../../../models/ui/input/utility/update-Input.input";


interface OwnProps {
  step: (step: "decrement" | "increment") => void;
}

interface StateProps {
  loading: boolean;
  error: string;
}

interface DispatchProps {
  postDetails: typeof postDetails;
}

// Become true when user click on next in the first time
let nextPage = false;

type Props = DispatchProps & StateProps & OwnProps;
const BusinessRegistration: React.FC<Props> = (props) => {
  const [Error, setError] = useState<string>("");
  const [timeOut, setTimeOut] = useState<any>(null);
  // const [BusinessDetails, setstate] = useState<BusinessDetails>({
  //   name: "",
  //   address: "",
  //   phone: "",
  //   email: "",
  //   about: "",
  //   links: {},
  //   hours: {},
  //   domain: ""
  // })
  const [Form, setForm] = useState<any>({
    name: {
      ...plainText, elementConfig: {
        type: "text",
        placeholder: "שם העסק",
      },
      value: "",
      label: "שם העסק",
    },
    address: {
      ...plainText, elementConfig: {
        type: "text",
        placeholder: "כתובת",
      },
      value: "", label: "כתובת",
      validation: {
        required: true,
        minLen: 10,
      }
    },
    phone
    , email,
    about: { ...plainText, label: "אודות", elementType: 'textArea' },
    domain
  });

  // const changeLinks = (e: any, name: string) => {
  //   const links = props.values.socialMediaLinks;
  //   links[name] = e.target.value;
  //   props.onChange(e, "socialMediaLinks", links);
  // };

  // Checks the information in front of the server
  const onClickNext = () => {


    let ansForm = Object.assign(
      {},
      ...Object.keys(Form).map((k) => ({ [k]: Form[k].value }))
    );

    console.log(ansForm);
    props.postDetails(ansForm);


    props.step('increment');
    // const phone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    // const url = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

    // if (!phone.test(props.values.businessPhone)) {
    //   setError(language.phoneError[1]);
    // } else if (
    //   (!url.test(props.values.socialMediaLinks["website"]) &&
    //     props.values.socialMediaLinks["website"]) ||
    //   (!url.test(props.values.socialMediaLinks["facebook"]) &&
    //     props.values.socialMediaLinks["facebook"]) ||
    //   (!url.test(props.values.socialMediaLinks["instagram"]) &&
    //     props.values.socialMediaLinks["instagram"])
    // ) {
    //   setError(language.urlError[1]);
    // } else {
    //   setError("");
    //   props.postDetails(form);
    //   nextPage = true;
    // }
  };
  const inputChangedHandler = (e: any, inputIdentifier: any) => {

    const ans = inputChanged(Form, e, inputIdentifier);
    setForm(ans.updatedForm);
    setError("")


    if (timeOut) clearTimeout(timeOut);
    setTimeOut(setTimeout(() => {
      if (!ans.formIsValid) {
        const index = Object.keys(ans.updatedForm).
          filter(it => !ans.updatedForm[it].valid && ans.updatedForm[it].touched).pop();
        !index ? setError("") : setError(ans.updatedForm[index].error)
      }
    }, 500))


  };

  const formElementsArray = Object.keys(Form).map((key) => {
    return {
      id: key,
      config: Form[key],
    };
  });

  return (
    <div className={BusinessRegistrationStyle.Business}>
      <AuthenticationHeadrer
        title={language.businessHeaderTitle[1]}
        subTitle={language.businessHeaderSubTitle[1]}
        error={Error ? Error : props.error}
      />

      <div className={ManagerRegistrationStyle.Body}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            label={formElement.config.label}
            style={formElement.config.style}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(e) =>
              inputChangedHandler(e, formElement.id)
            }
          />
        ))}
        {/* Busniess Name */}
        {/* <Input
          label={language.businessName[1]}
          name="businessname"
          type="text"
          value={props.values.businessName}
          onChange={(e) => props.onChange(e, "businessName")}
          class="border"
          style={{ width: '40%' }}
        />

        {/* Address */}
        {/* <Input
          label={language.address[1]}
          name="businessAddress"
          type="text"
          value={props.values.businessAddress}
          onChange={(e) => props.onChange(e, "businessAddress")}
          class="border"
          style={{ width: '40%' }}
        /> */}

        {/* Business Phone */}
        {/* <Input
          label={language.phone[1]}
          name="businessPhone"
          type="tel"
          value={props.values.businessPhone}
          onChange={(e) => props.onChange(e, "businessPhone")}
          class="border"
          style={{ width: '40%' }}
        /> */}

        {/* Email */}
        {/* <Input
          label={language.email[1]}
          name="businessEmail"
          type="email"
          value={props.values.businessEmail}
          onChange={(e) => props.onChange(e, "businessEmail")}
          class="border"
          style={{ width: '40%' }}
        /> */}

        {/* About */}
        {/* <Input
          label={language.about[1]}
          name="about"
          value={props.values.about}
          style={{ width: '40%' }}
          onChange={(e) => props.onChange(e, "about")}
          class="border"
          type="text"
          textArea={true}
        /> */}

        {/* Links */}
        {/* <SocialMediaLinks onChange={changeLinks} values={props.values.socialMediaLinks} style={{ marginTop: '-15px' }} /> */}
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
  postDetails: (form: BusinessDetails) => dispatch(postDetails(form)),
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
