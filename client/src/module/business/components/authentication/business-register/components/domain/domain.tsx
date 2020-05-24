import React, { useState, memo } from 'react';
import ManagerRegistrationStyle from "../manager-registration/manager-registration.module.scss";
import Button from '../../../../../../../models/ui/button/button';
import { connect } from 'react-redux';
import { getLoading, getError } from '../../../../../../../store/auth/auth.selectors';
import { getDomain } from '../../../../../../../store/auth/auth.actions';

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
    getDomain: typeof getDomain
}

// Become true when user click on next in the first time
let nextPage = false;

type Props = DispatchProps & StateProps & OwnProps;
const Domain: React.FC<Props> = (props) => {

    // Checks the information in the server
    const onClickNext = () => {
        props.getDomain(props.values.domain);
        nextPage = true;
    };

    if (!props.loading && !props.error && nextPage) props.step('increment');

    return (
        <div>
            <div className={ManagerRegistrationStyle.Header}>
                <p className={ManagerRegistrationStyle.Title}>הוספת עסק חדש</p>
                <p className={ManagerRegistrationStyle.SubTitle}>
                    השם שתוסיף לכאן יהיה כתובת האתר שלך.
                </p>
            </div>

            {props.error && <p className={ManagerRegistrationStyle.Error} style={{ marginBottom: '-50px' }}>{props.error}</p>}


            <div className={ManagerRegistrationStyle.Body} style={{ marginTop: '50px' }}>
                {/* First Name */}
                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="name">שם העסק (באנגלית)</label>
                    <input
                        pattern="[A-Za-z]{3}"
                        id="name"
                        name="name"
                        required={true}
                        type="text"
                        value={props.values.domain}
                        placeholder=""
                        onChange={(e) => props.onChange(e, 'domain')}
                    />
                </div>
            </div>

            {
                !props.loading ?
                    <div style={{ textAlign: 'center', marginTop: '30px' }} onClick={onClickNext}>
                        <Button color="purple-register">המשך</Button>
                    </div>
                    :
                    <div style={{ textAlign: 'center' }}>Loading...</div>
            }
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getDomain: (domain: string) => dispatch(getDomain(domain))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(memo(Domain,
    (prevState, nextState) => {
        console.log('Domain');
        if (!nextState.loading && !nextState.error && nextPage) {
            prevState.step('increment');
            return true;
        }
        return false;
    }));
