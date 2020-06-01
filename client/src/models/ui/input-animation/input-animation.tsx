import React from 'react';
import InputAnimationStyle from './input-animation.module.scss'

interface OwnProps {
    label?: string,
    name: string,
    type: string,
    value: any,
    onChange?: (e: any) => void,
    placeholder?: string,
    style?: {}
}
const InputAnimation: React.FC<OwnProps> = (props) => {
    return (
        <div className={InputAnimationStyle.Field}>
            <input
                autoComplete="off"
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

export default InputAnimation;