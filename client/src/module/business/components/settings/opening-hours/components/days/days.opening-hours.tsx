import React from 'react';
import DaysStyle from './days.module.scss';
import Checkbox from '../../../../../../../models/ui/checkbox/checkbox';

interface OwnProps {
    days: string [],
    onClickDay: (e: any, i: number) => void
}

const Days: React.FC<OwnProps> = (props) => {
    return (
        <div className={DaysStyle.Days}>
            {/* {
                props.days.map((d: string, i) => 
                <Checkbox
                id={"day" + i}
                onClick={(e) => onClickDay(e, i)}
                value={i}
                defaultChecked={props.values[FullEngDays[i]]}
                label={" " + day}
            />
                )
            } */}
        </div>
    )
}


export default Days;