import React from "react";
import classes from "./inp.module.scss";

interface OwnProps {
  ref?: any;
  label?: string;
  name?: string;
  value: any;
  key: string;
  elementType: string;
  elementConfig: { type: string; placeholder: string };
  shouldValidate: {};
  invalid: boolean;
  touched: boolean;
  changed?: (e: any) => void;
  placeholder?: string;
  style?: {};
}

const Inp: React.FC<OwnProps> = (props) => {
  console.log(props.style);
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  let error = null;
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    error = <p> בבקשה תרשום {props.label} כמו שצריך </p>;
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    //   case "select":
    //     inputElement = (
    //       <select
    //         className={inputClasses.join(" ")}
    //         value={props.value}
    //         onChange={props.changed}
    //       >
    //         {props.elementConfig.options.map((option) => (
    //           <option key={option.value} value={option.value}>
    //             {option.displayValue}
    //           </option>
    //         ))}
    //       </select>
    //     );
    //     break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {error}
    </div>
  );
};

export default Inp;
