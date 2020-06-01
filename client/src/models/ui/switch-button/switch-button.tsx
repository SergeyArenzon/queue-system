import React, { useState, useEffect } from 'react';
import SwitchButtonStyle from './switch-button.module.scss';

interface OwnProps {
    state: boolean,
    onChange: (name: string, value: any) => void
}

const SwitchButton: React.FC<OwnProps> = (props) => {
    const [State, setState] = useState(props.state)

    const Switch = (e: any) => {
        setState(!State);
        props.onChange('available', !State);
    }

    return (
        <label className={SwitchButtonStyle.Switch}>
            <input type="checkbox" onClick={(e) => Switch(e)} defaultChecked={State} />
            <span className={SwitchButtonStyle.Slider}></span>
        </label>
    )
}


export default SwitchButton;