import React from 'react';
import BusinessSettingsStyle from './business-settings.module.scss';
import Header from '../../shared/header/header.shared';
import Breadcrumbs from '../../../../../models/ui/breadcrumbs/breadcrumbs';

const BusinessSettings = () => {
    return (
        <React.Fragment>
            <Header title="הגדרות עסק" sunTitle="כאן תוכל לערוך את הגדרות העסק שלך" />

            <div className={BusinessSettingsStyle.BusinessSettings}>
            <Breadcrumbs title="הגדרות עסק" />
            <div className={BusinessSettingsStyle.Body}>

            </div>
            </div>
        </React.Fragment>
    )
}


export default BusinessSettings;