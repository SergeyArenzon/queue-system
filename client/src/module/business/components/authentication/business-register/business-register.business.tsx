import React, { useState } from 'react';
import BusinessRegisterStyle from './business-register.module.scss'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getLoading, getError } from '../../../../../store/auth/auth.selectors';
import { Service } from '../../../../../models/system/service';
import ManagerRegistration from './components/manager-registration/manager-registration';
import BusinessRegistration from './components/business-registration/business-registration';
import Services from './components/services/services';
import Times from './components/times/times';
import Timeline from './components/timeline/timeline';
import Domain from './components/domain/domain';

interface FormState {
    domain: string,
    managerFirstName: string,
    managerLastName: string,
    managerPhone: string,
    managerEmail: string,
    password: string,
    validatePassword: string,
    businessName: string,
    businessAddress: string,
    businessPhone: string,
    businessEmail: string,
    logo: string,
    socialMediaLinks: { [key: string]: string },
    about: string,
    services: { [key: string]: Service[] },
    workTimes:  {[day: string]: { start: string, end: string }}
}

interface StateProps {
    loading: boolean;
    error: Error
}

interface DispatchProps {
}

type Props = DispatchProps & StateProps;

const BusinessRegister: React.FC<Props> = (props) => {

    const [Form, setForm] = useState<FormState>({
        domain: '',
        managerFirstName: '',
        managerLastName: '',
        managerPhone: '',
        managerEmail: '',
        password: '',
        validatePassword: '',
        businessName: '',
        businessAddress: '',
        businessPhone: '',
        businessEmail: '',
        logo: '',
        socialMediaLinks: { 'website': '', 'facebook': '', 'instagram': '' },
        about: '',
        services: {},
        workTimes: {}
    });

    const [Step, setStep] = useState<number>(5);

    const step = (step: 'decrement' | 'increment') => {
        if (step === "decrement") {
            setStep(Step - 1);
        }
        else {
            setStep(Step + 1);
        }
    }

    const onChange = (e: any, name: string, value?: any) => {
        if (value) {
            setForm({
                ...Form, [name]: value
            });
            return;
        }
        setForm({
            ...Form, [name]: e.target.value
        });
    }

    const { domain, managerFirstName, managerLastName, managerPhone, managerEmail, password, validatePassword, businessName, businessAddress,
        businessPhone, businessEmail, logo, socialMediaLinks, about, services, workTimes } = Form;
    const values = {
        domain, managerFirstName, managerLastName, managerPhone, managerEmail, password, validatePassword, businessName, businessAddress,
        businessPhone, businessEmail, logo, socialMediaLinks, about, services, workTimes
    }

    return (
        <div className={BusinessRegisterStyle.Register}>
            <div className={BusinessRegisterStyle.Timeline}>
                <Timeline step={Step} />
            </div>

            <div className={BusinessRegisterStyle.Form}>
                {Step === 1 && <Domain step={step} onChange={onChange} values={values} />}

                {Step === 2 && <ManagerRegistration step={step} onChange={onChange} values={values} />}

                {Step === 3 && <BusinessRegistration step={step} onChange={onChange} values={values} />}

                {Step === 4 && <Times step={step} onChange={onChange} values={values} />}

                {Step === 5 && <Services step={step} onChange={onChange} values={values} />}
            </div>

        </div>
    )
}

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state)
});

const mapDispatchToProps = (dispatch: any) => ({

});

export default compose<any>(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(BusinessRegister);