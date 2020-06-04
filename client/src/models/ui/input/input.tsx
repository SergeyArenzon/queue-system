import React from 'react';
import inputStyle from './input-border.module.scss';
import InputLinetyle from './input-line.module.scss';


interface OwnProps {
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
    class?: "line" | "border",
}
const Input: React.FC<OwnProps> = (props) => {

    let inputElement = null;
    // const inputClasses = [classes.InputElement];
    let error = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        console.log(props.invalid, props.shouldValidate, props.touched);

        //inputClasses.push(classes.Invalid);
        error = <p> בבקשה תרשום {props.label} כמו שצריך </p>;
    }

    const scssFile = props.class === "line" ? InputLinetyle.Input : inputStyle.Input;


    switch (props.elementType) {
        case "input":
            inputElement =
                (
                    <input
                        className={props.class === "line" ? InputLinetyle.InputItem : inputStyle.InputItem}
                        {...props.elementConfig}
                        placeholder={props.label}
                        value={props.value}
                        onChange={props.changed}
                    />
                );
            break;
        case "textArea":
            inputElement =
                (
                    <textarea
                        {...props.elementConfig}
                        placeholder={props.label}
                        value={props.value}
                        onChange={props.changed}
                    />
                );
            break;
    }

    return (
        <div style={props.style} className={scssFile}>
            {/* {error} */}
            {inputElement}
            <label className={props.class === "line" ? InputLinetyle.Label : inputStyle.Label} htmlFor={props.name}>{props.label}</label>
        </div>
    );
};

export default Input;
