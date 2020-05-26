import React from 'react';
import inputStyle from './input.module.scss';

interface OwnProps {
    label?: string,
    name: string,
    type: string,
    value: any,
    onChange?: (e: any) => void,
    placeholder?: string
}

const Input: React.FC<OwnProps> = (props) => {
    return (
        <div className={inputStyle.Input}>
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
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