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
    style?: {},
    textArea?: boolean
}

const Input: React.FC<OwnProps> = (props) => {

    const scssFile = props.class === "line" ? InputLinetyle.Input : inputStyle.Input;
    return (
        <div style={props.style} className={scssFile}>
            {props.textArea ?
                <textarea
                    autoComplete="off"
                    id={props.name}
                    name={props.name}
                    placeholder={props.label}
                    value={props.value}
                    onChange={props.onChange}
                />
                :
                <input
                    className={props.class === "line" ? InputLinetyle.InputItem : inputStyle.InputItem}
                    autoComplete={props.type === "file" ? "on" : "off"}
                    id={props.name}
                    name={props.name}
                    type={props.type}
                    placeholder={props.type === "file" ? "" : props.label}
                    value={props.type === "file" ? "" : props.value}
                    onChange={props.onChange}
                />
            }
            <label className={props.class === "line" ? InputLinetyle.Label : inputStyle.Label} htmlFor={props.name}>{props.label}</label>
        </div>
    )
}

export default Input;