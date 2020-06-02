import React, { useState } from 'react';
import AddServiceStyle from './add-service.module.scss';
import Modal from '../../../../../../../models/ui/modal/modal';
import InputAnimation from '../../../../../../../models/ui/input-animation/input-animation';
import Button from '../../../../../../../models/ui/button/button';
import { Service } from '../../../../../../../models/system/service';
import Autocomplete from '../../../../../../../models/ui/autocomplete/autocomplete';
import SwitchButton from '../../../../../../../models/ui/switch-button/switch-button';

interface OwnProps {
    close: () => void;
    addNewService: (service: Service) => void;
    categories: string[],
    updateService: Service | null
}

const initialService: Service = {
    category: '',
    title: '',
    price: 0,
    duration: 0,
    available: true
}

const AddService: React.FC<OwnProps> = (props) => {
    const [NewService, setNewService] = useState<Service>(props.updateService ? props.updateService : initialService);

    const onChange = (e: any, name: string) => {
        setNewService({
            ...NewService, [name]: e.target.value
        })
    }

    // Invoke when user click on category name in autocomplete
    const onChangeBySpecificName = (name: string, value: any) => {
        setNewService({
            ...NewService, [name]: value
        });
    };


    const Footer = () => (
        <div className={AddServiceStyle.Button}>
            <Button onClick={() => props.addNewService(NewService)} color="purple">הוסף שירות</Button>
        </div>
    )

    return (
        <Modal title="הוספת שירות" close={props.close} footer={<Footer />}>
            <div className={AddServiceStyle.Body}>
                <InputAnimation name="category  " type="text" value={NewService.category}
                    onChange={(e) => onChange(e, "category")} placeholder="קטגוריה" />
                <Autocomplete wordsList={props.categories} word={NewService.category} onCategoryClick={onChangeBySpecificName} />

                <InputAnimation name="title" type="text" value={NewService.title}
                    onChange={(e) => onChange(e, "title")} placeholder="שם השירות" />

                <InputAnimation name="price" type="number" value={NewService.price == 0 ? "" : NewService.price}
                    onChange={(e) => onChange(e, "price")} placeholder="מחיר" />

                <InputAnimation name="duration" type="number" value={NewService.duration == 0 ? "" : NewService.duration}
                    onChange={(e) => onChange(e, "duration")} placeholder="זמן" />

                <div className={AddServiceStyle.Available}>
                    <p style={NewService.available ? { color: '#7467ef' } : { color: 'rgba(52, 49, 76, 1)' }}>
                        {NewService.available ? "זמין" : "לא זמין"}
                    </p>
                    <SwitchButton state={NewService.available !== undefined ? NewService.available : true} onChange={onChangeBySpecificName} />
                </div>
            </div>
        </Modal>
    )
}

export default AddService;