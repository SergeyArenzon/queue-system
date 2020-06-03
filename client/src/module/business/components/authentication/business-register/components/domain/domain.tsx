import React, { memo, useState } from 'react';
import ManagerRegistrationStyle from "../manager-registration/manager-registration.module.scss";
import * as language from '../../../../../../../assets/language/language'
import Button from '../../../../../../../models/ui/button/button';
import { connect } from 'react-redux';
import { getLoading, getError } from '../../../../../../../store/auth/auth.selectors';
import { setDomain } from '../../../../../../../store/auth/auth.actions';
import AuthenticationHeadrer from '../../../shared/authentication-header/authentication-headrer';
import Input from '../../../../../../../models/ui/input/input';

interface OwnProps {
    step: (step: 'decrement' | 'increment') => void,
    onChange: (e: any, name: string, value?: any) => void,
    values: any
}

interface StateProps {
    loading: boolean;
    error: string
}

interface DispatchProps {
    setDomain: typeof setDomain
}

// Become true when user click on next in the first time
let nextPage = false;

type Props = DispatchProps & StateProps & OwnProps;
const Domain: React.FC<Props> = (props) => {
    const [Error, setError] = useState<string>("");

    // Checks the information in the server
    const onClickNext = () => {
        props.step('increment');
        const english = /^[a-zA-Z]+$/;
        if (props.values.domain.length < 2) {
            setError(language.domainLengthError[1]);
        }
        else if (!english.test(props.values.domain)) {
            setError(language.englishOnlyError[1])
        }
        else {
            setError("");
            //props.setDomain(props.values.domain);
            nextPage = true;
        }
    };

    return (
        <React.Fragment>
            <AuthenticationHeadrer title={language.domainHeaderTitle[1]} subTitle={language.domainHeaderSubTitle[1]}
                error={Error ? Error : props.error} />

            <div className={ManagerRegistrationStyle.Body} style={{ marginTop: '50px' }}>
                <Input label={language.domainTitle[1]} name="domain" type="text"
                    value={props.values.domain} onChange={(e) => props.onChange(e, 'domain')} class="border" />
            </div>

            {
                !props.loading ?
                    <div style={{ textAlign: 'center', marginTop: '30px' }} onClick={onClickNext}>
                        <Button color="purple-register">{language.next[1]}</Button>
                    </div>
                    :
                    <div style={{ textAlign: 'center' }}>Loading...</div>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    setDomain: (domain: string) => dispatch(setDomain(domain))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(memo(Domain,
    (prevProps, nextProps) => {
        console.log('Domain');
        if (!nextProps.loading && !nextProps.error && nextPage && Error.length <= 1) {
            nextProps.step('increment');
            return true;
        }
        return false;
    }));
