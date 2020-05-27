import React from 'react';
import inputStyle from './input.module.scss';

interface OwnProps {
    label?: string,
    name: string,
    type: string,
    value: any,
    onChange?: (e: any) => void,
    placeholder?: string,
    style?: {}
}

const Input: React.FC<OwnProps> = (props) => {
    console.log(props.style);
    
    return (
        <div style={props.style} className={inputStyle.Input}>
            {props.label && <label style={props.style} htmlFor={props.name}>{props.label}</label>}
            <input
                id={props.name}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default Input;