import React, { useState, useEffect } from 'react';
import ManagerRegistrationStyle from '../manager-registration/manager-registration.module.scss';
import BusinessRegistrationStyle from '../business-registration/business-registration.module.scss';
import TimesStyle from './times.module.scss';
import Button from '../../../../../../../models/ui/button/button';
import { getLoading, getError } from '../../../../../../../store/auth/auth.selectors';
import { connect } from 'react-redux';
import { postBuisnessHours } from '../../../../../../../store/auth/auth.actions';

interface OwnProps {
    step: (step: 'decrement' | 'increment') => void,
    onChange: (e: any, name: string, value?: any) => void,
    values: any
}

interface StateProps {
    loading: boolean;
    error: Error
}

interface DispatchProps {
    postBuisnessHours: typeof postBuisnessHours
}

// Become true when user click on next in the first time
let nextPage = false;
const FullHebDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
const FullEngDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const mobileHebDays = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"];
const hours = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"];

type Props = DispatchProps & StateProps & OwnProps;
const Times: React.FC<Props> = (props) => {
    const [CurDay, setCurDay] = useState<number>(0)
    const [IsMobile, setIsMobile] = useState<any>(false);
    const [Error, setError] = useState('');

    // Component did mount
    useEffect(() => {
        const resize = () => { // Check if the device witdh <= 600px
            let currentHideNav = (window.innerWidth <= 600);
            if (currentHideNav !== IsMobile) {
                setIsMobile(currentHideNav);
            }
        }
        resize();
    }, [IsMobile]);

    let hebDays: string[] = IsMobile ? mobileHebDays : FullHebDays;

    const onClickDay = (e: any, i: number) => {
        const workdays = [...props.values.workDays];
        if (workdays[i] !== true) {
            workdays[i] = true
            setError('');
        }
        else
            workdays[i] = !props.values.workDays[i];

        props.onChange(e, 'workDays', workdays);
    }

    const changeDay = (e: any) => {
        setCurDay(e.target.value);
    }

    const changeHour = (e: any, value: 'start' | 'end') => {
        const workHours = [...props.values.workHours];
        workHours[CurDay][value] = e.target.value;
        props.onChange(e, 'workHours', workHours);
    }

    const onClickNext = () => {
        props.step('increment')
        let schdule: { [day: string]: { start: string, end: string }[] } = {};
        props.values.workDays.forEach((day: boolean, i: number) => {
            if (day) {
                if (!schdule[FullEngDays[i]])
                    schdule[FullEngDays[i]] = [];
                schdule[FullEngDays[i]].push({ start: props.values.workHours[i].start, end: props.values.workHours[i].end })
            }
        });
        if (Object.keys(schdule).length === 0) {
            setError('לא הוזנו ימים')
        }
        else {
            props.postBuisnessHours(schdule);
        }
    }

    //  if (props.loading) return <div>Loading...</div>;

    return (
        <div className={TimesStyle.Times}>
            <div className={ManagerRegistrationStyle.Header}>
                <p className={ManagerRegistrationStyle.Title}>קביעת זמני פעילות</p>
                <p className={ManagerRegistrationStyle.SubTitle}>הוסף אני הימים והשעות שהעסק שלך פועל בהם</p>
            </div>

            {Error && <p className={ManagerRegistrationStyle.Error}>{Error}</p>}

            <div className={TimesStyle.Body}>
                <p className={TimesStyle.Title}>סמן את ימי העבודה שלך</p>
                <div className={TimesStyle.Days}>

                    {
                        hebDays.map((day: string, i: number) => {
                            return (
                                <React.Fragment key={i * 26}>
                                    <div className={TimesStyle.Day} >
                                        <input onClick={(e) => onClickDay(e, i)} className={TimesStyle.Checkbox}
                                            type="checkbox" defaultChecked={props.values.workDays[i]} id={"day" + i} value={i} />
                                        <label htmlFor={"day" + i}>{" " + day}</label>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>

                {
                    (props.values.workDays[0] || props.values.workDays[1] || props.values.workDays[2] || props.values.workDays[3]) &&
                    <div className={TimesStyle.Hours}>
                        <p className={TimesStyle.Title}> סמן שעות עבודה </p>
                        <span>בחר יום</span>
                        <select onChange={changeDay} >
                            {
                                hebDays.map((day: string, i: number) => {
                                    if (props.values.workDays[i]) {
                                        return (
                                            <option key={i * 21} value={i}>{day}</option>
                                        );
                                    }
                                })
                            }
                        </select>
                        
                        <br />

                        <div className={TimesStyle.Hour}>
                            <select onChange={(e) => changeHour(e, 'start')} value={props.values.workHours[CurDay]['start'] ?
                                props.values.workHours[CurDay]['start'] : ''}>
                                {
                                    hours.map((hour: string) => {
                                        return <option key={parseInt(hour) * 2} value={hour}>{hour}</option>
                                    })
                                }
                            </select>
                            <select onChange={(e) => changeHour(e, 'end')} value={props.values.workHours[CurDay]['end'] ?
                                props.values.workHours[CurDay]['end'] : ''}>
                                {
                                    hours.map((hour: string) => {
                                        if (props.values.workHours[CurDay]['start']) {
                                            if (parseInt(props.values.workHours[CurDay]['start']) > parseInt(hour)) return
                                        }
                                        return <option key={parseInt(hour) * 6} value={hour}>{hour}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                }
            </div>
            <div className={BusinessRegistrationStyle.Buttons} style={{ marginTop: '30px' }}>
                <Button onClick={() => props.step('decrement')} color='orange'>חזור</Button>
                <Button onClick={onClickNext} color='purple-register'>המשך</Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    postBuisnessHours: (form: { [day: string]: { start: string, end: string }[] }) => dispatch(postBuisnessHours(form))

});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Times);