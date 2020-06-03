import React, { useState } from 'react';
import BusinessSettingsStyle from './business-settings.module.scss';
import Header from '../../shared/header/header.shared';
import Breadcrumbs from '../../../../../models/ui/breadcrumbs/breadcrumbs';
import { BusinessDetails } from '../../../../../models/system/business-details';
import Input from '../../../../../models/ui/input/input';
import SocialMediaLinks from '../../authentication/business-register/components/business-registration/components/social-media-links/social-media-links';
import { postingImg } from '../../../../../assets/images/export-images'
import Button from '../../../../../models/ui/button/button';
import {ArrowNext} from '../../../../../assets/icons/icons'
const BusinessSettings = () => {
    const [BusinessDetails, setBusinessDetails] = useState<BusinessDetails>({
        about: "מספרת דור הוקמה בשנת 1992",
        address: "מנחם בגין 3",
        domain: "dorlevi",
        email: "dorlevy121#gmail.com",
        links: {
            "website": "www.dor.co.il",
            "facebook": "www.facebook.com",
            "instagram": "www.instagram.com"
        },
        name: "מספרת דור",
        phone: "0502243024",
    });

    const changeLinks = (e: any, name: string) => {
        const links = BusinessDetails.links;
        links[name] = e.target.value;
        setBusinessDetails({
            ...BusinessDetails, links: links
        })
    };

    return (
        <React.Fragment>
            <Header title="הגדרות עסק" sunTitle="כאן תוכל לערוך את הגדרות העסק שלך" />

            <div className={BusinessSettingsStyle.BusinessSettings}>
                <Breadcrumbs title="הגדרות עסק" />
                <div className={BusinessSettingsStyle.Body}>
                    <div className={BusinessSettingsStyle.Details}>
                        <Input
                            label="שם העסק"
                            name="name"
                            type="text"
                            value={BusinessDetails.name}
                            class="border"
                            style={{ width: '300px' }}
                        />

                        <Input
                            label="כתובת"
                            name="address"
                            type="text"
                            value={BusinessDetails.address}
                            class="border"
                            style={{ width: '300px' }}
                        />

                        <Input
                            label="טלפון"
                            name="phone"
                            type="text"
                            value={BusinessDetails.phone}
                            class="border"
                            style={{ width: '300px' }}
                        />

                        <Input
                            label="אימייל"
                            name="email"
                            type="text"
                            value={BusinessDetails.email}
                            class="border"
                            style={{ width: '300px' }}
                        />

                        <Input
                            label="כתובת אתר"
                            name="domain"
                            type="text"
                            value={BusinessDetails.domain}
                            class="border"
                            style={{ width: '300px' }}
                        />

                        <Input
                            label="לוגו"
                            name="logo"
                            type="text"
                            value={BusinessDetails.domain}
                            class="border"
                            style={{ width: '300px' }}
                        />

                        <Input
                            label="על העסק"
                            name="name"
                            type="text"
                            value={BusinessDetails.about}
                            class="border"
                            style={{ width: '300px' }}
                            textArea={true}
                        />
                        <SocialMediaLinks onChange={changeLinks} values={BusinessDetails.links} iconColor="#7467ef" style={{ width: '300px' }} />

                    </div>

                    <div className={BusinessSettingsStyle.Photo}>
                        <img src={postingImg} alt="" />
                    </div>
                </div>

                <div className={BusinessSettingsStyle.Button}>
                    <Button color="purple">שמירה שינויים <ArrowNext /></Button>
                </div>

            </div>
        </React.Fragment>
    )
}


export default BusinessSettings;