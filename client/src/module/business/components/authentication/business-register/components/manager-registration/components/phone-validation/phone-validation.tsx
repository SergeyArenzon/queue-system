import React, { useState } from 'react';
import PhoneValidationStyle from './phone-validation.module.scss';
import Input from '../../../../../../../../../models/ui/input/input';
import Button from '../../../../../../../../../models/ui/button/button';
import * as language from '../../../../../../../../../assets/language/language';

interface OwnProps {
    email: string,
    verificationPhone: (verificationCode: string) => void,
    onChangePhone: (e: any, name: string) => void,
    sendMassage?: () => void
}

const PhoneValidation: React.FC<OwnProps> = (props) => {
    const [ChangePhone, setChangePhone] = useState<boolean>(false);
    const [VerificationCode, setVerificationCode] = useState<string>("")

    return (
        <div className={PhoneValidationStyle.PhoneValidation}>
            {
                ChangePhone ?
                    <p>נא הזן מספר טלפון תקין </p>
                    :
                    <p>שלחנו אלייך עכשיו SMS עם קוד אימות למספר {props.email} </p>
            }
            {
                ChangePhone ?
                    <Input label="מספר טלפון" name="phone" type="tel" style={{ width: '50%', margin: 'auto' }}
                        value={props.email} onChange={(e) => props.onChangePhone(e, "email")} class="border" />
                    :
                    <Input label="קוד אימות" name="phone" type="text" style={{ width: '50%', margin: 'auto' }}
                        value={VerificationCode} onChange={(e) => setVerificationCode(e.target.value)} class="border" />
            }

            <div className={PhoneValidationStyle.Buttons}>
                {
                    ChangePhone ?
                        <React.Fragment>
                            <Button color="orange" onClick={() => setChangePhone(false)}>עדכן מספר טלפון</Button>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Button color="orange" onClick={() => setChangePhone(true)}>החלף מספר</Button>
                            <Button color="purple-register" onClick={() => props.verificationPhone(VerificationCode)}>{language.next[1]}</Button>
                        </React.Fragment>
                }
            </div>
        </div>
    )
}

export default PhoneValidation;