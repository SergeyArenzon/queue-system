import React from 'react';
import inputStyle from './input-border.module.scss';
import InputLinetyle from './input-line.module.scss';


interface OwnProps {
    label: string,
    name: string,
    type: string,
    value: any,
    class: "line" | "border",
    onChange?: (e: any) => void,
    style?: {}
}

const Input: React.FC<OwnProps> = (props) => {

    const scssFile = props.class === "line" ? InputLinetyle.Input : inputStyle.Input;
    return (
        <div style={props.style} className={scssFile}>
            <input
                autoComplete="off"
                id={props.name}
                name={props.name}
                type={props.type}
                placeholder={props.label}
                value={props.value}
                onChange={props.onChange}
            />
            <label className={props.class === "line" ? InputLinetyle.Label : ""} htmlFor={props.name}>{props.label}</label>
        </div>
    )
}

export default Input;