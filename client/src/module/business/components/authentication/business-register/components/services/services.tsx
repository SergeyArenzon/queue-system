import React, { useState } from "react";
import ServicesStyle from "./services.module.scss";
import ManagerRegistrationStyle from "../manager-registration/manager-registration.module.scss";
import BusinessRegistrationStyle from "../business-registration/business-registration.module.scss";
import Button from "../../../../../../../models/ui/button/button";
import { Service } from "../../../../../../../models/system/service";
import { connect } from "react-redux";
import { postService } from "../../../../../../../store/service/service.actions";
import {
  getLoading,
  getError,
  getServices,
} from "../../../../../../../store/service/service.selectors";

import { serviceState } from "../../../../../../../store/service/service.types";

interface AutoCompleteState {
  showOptions: boolean;
  filteredOptions: string[];
  activeOption: number;
}

interface OwnProps {
  step: (step: "decrement" | "increment") => void;
  onChange: (e: any, name: string, value?: any) => void;
  values: any;
}

interface DispatchProps {
  postService: typeof postService;
}

interface StateProps {
  error: string;
  loading: boolean;
  services: Service[];
}

const initService: Service = {
  category: "",
  title: "",
  price: 0,
  duration: 0,
  available: true,
};

type Props = DispatchProps & StateProps & OwnProps;
const Services: React.FC<Props> = (props) => {
  const [Service, setService] = useState<Service>(initService); // Hold the cuurent service
  const [AutoComplete, setAutoComplete] = useState<AutoCompleteState>({
    showOptions: false,
    filteredOptions: [],
    activeOption: 0,
  });
  const [EditMode, setEditMode] = useState<boolean>(false);

  // Initial filteredOptions array in options
  const onCategoryChange = (e: any) => {
    const options = Object.keys(props.values.services);
    const userInput = e.currentTarget.value;

    const filteredOptions = options.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setAutoComplete({
      ...AutoComplete,
      activeOption: 0,
      filteredOptions: filteredOptions.slice(0, 5),
      showOptions: true,
    });
    setService({ ...Service, category: userInput });
  };

  // Invoke when user click on category name in autocomplete
  const onCategoryClick = (title: string) => {
    setService({ ...Service, category: title });
    setAutoComplete({
      ...AutoComplete,
      showOptions: false,
    });
  };

  // Show all the services that added
  // const AllServices = () => {
  //   const serivcesList: JSX.Element[] = [];

  //   for (var key in props.values.services) {
  //     console.log(props.values.services);

  //     if (!props.values.services[key]) continue;
  //     props.values.services[key].forEach((s: Service) => {
  //       serivcesList.push(
  //         <p onClick={() => editService(s)} key={s.price * s.duration}>
  //           {s.title}
  //         </p>
  //       );
  //     });
  //   }
  //   return serivcesList;
  // };

  const AllServices = () => {
    return props.services.length > 0
      ? props.services.map((service: Service, i: number) => (
        <p onClick={() => editService(service)} key={i * 13}>
          {service.title} {service.price} {service.duration}{" "}
        </p>
      ))
      : null;
  };

  // Invoke when user click on existing service
  const editService = (service: Service) => {
    setService(service);
    setEditMode(true);
  };

  // Add new service
  const addNewService = (e: any, service: Service) => {
    // if (!service.category) {
    //     setError('כל שירות חייב להיות משוייך לקטגוריה')
    // }
    // if (!service.title) {
    //   setError("כותרת ריקה");
    // } else if (!service.price) {
    //   setError("לא הוזן מחיר");
    // } else if (!service.duration) {
    //   setError("לא הוזן זמן");
    // } else {      
    props.postService(service);

    // const services = props.values.services;
    // if (EditMode) {
    //   const findService = (s: Service) => s.id === Service.id;
    //   const i = services[Service.category].findIndex(findService);
    //   services[Service.category].splice(i, 1);
    // }
    // if (!services[service.category]) {
    //   services[service.category] = [];
    // }
    // service.id = uniqueId();
    // services[service.category].push(service);
    // props.onChange(e, "services", services);
    // setService(initService);
    // setError("");
    // setEditMode(false);

  };
  // console.log(cloneDeep(props.values.services));

  // AutoComplete Item
  let optionList;
  if (AutoComplete.showOptions && Service.category) {
    if (AutoComplete.filteredOptions.length) {
      optionList = (
        <div className={ServicesStyle.List}>
          {AutoComplete.filteredOptions.map((optionName, index) => {
            return (
              <p onClick={() => onCategoryClick(optionName)} key={optionName}>
                {optionName + " "}
              </p>
            );
          })}
        </div>
      );
    }
  }

  return (
    <div className={ServicesStyle.Services}>
      <div className={ManagerRegistrationStyle.Header}>
        <p className={ManagerRegistrationStyle.Title}>הוספת שירותים</p>
        <p className={ManagerRegistrationStyle.SubTitle}>
          הוסף את כל השירותים שהעסק שלך מציע.
        </p>
      </div>

      {props.error && <p className={ManagerRegistrationStyle.Error}>{props.error}</p>}

      <div className={ManagerRegistrationStyle.Body}>
        {/* Category Name */}
        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="category">קטגוריה *</label>
          <input
            id="category"
            name="category"
            required={true}
            type="text"
            value={Service.category}
            onChange={onCategoryChange}
          />
        </div>

        {/* AutoComplete */}
        <div className={ServicesStyle.Options}>{optionList}</div>

        {/* Service Name */}
        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="title">שם השירות *</label>

          <input
            id="title"
            name="title"
            required={true}
            type="text"
            value={Service.title}
            onChange={(e) => setService({ ...Service, title: e.target.value })}
          />
        </div>

        {/* Service Price */}
        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="price">מחיר*</label>

          <input
            id="price"
            name="price"
            required={true}
            type="number"
            value={Service.price}
            onChange={(e) =>
              setService({ ...Service, price: parseInt(e.target.value) })
            }
          />
        </div>

        {/* Service Duration */}
        <div className={ManagerRegistrationStyle.Field}>
          <label htmlFor="duration">משך זמן*</label>

          <input
            id="duration"
            name="duration"
            required={true}
            type="number"
            value={Service.duration}
            onChange={(e) =>
              setService({ ...Service, duration: parseInt(e.target.value) })
            }
          />
        </div>
      </div>

      <div className={ServicesStyle.ServicesList}>{AllServices()}</div>

      <div className={ServicesStyle.Button}>
        <Button
          border={true}
          onClick={(e: any) => addNewService(e, Service)}
          color="purple-register"
        >
          הוסף שירות
        </Button>
      </div>

      <div className={BusinessRegistrationStyle.Buttons}>
        <Button onClick={() => props.step("decrement")} color="orange"> חזור </Button>
        <Button onClick={() => props.step("increment")} color="purple-register"> סיום </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state),
  services: getServices(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  postService: (form: Service) => dispatch(postService(form)),
});

export default connect<serviceState, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Services);
