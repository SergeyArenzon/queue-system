import React, { useState } from 'react';
import ServicesStyle from './services.module.scss';
import ManagerRegistrationStyle from '../manager-registration/manager-registration.module.scss';
import BusinessRegistrationStyle from '../business-registration/business-registration.module.scss';
import Button from '../../../../../../../models/ui/button/button';
import { Service } from '../../../../../../../models/system/service';
import { uniqueId, cloneDeep } from 'lodash';

interface AutoCompleteState {
    showOptions: boolean;
    filteredOptions: string[];
    activeOption: number;
}

interface Props {
    step: (step: 'decrement' | 'increment') => void,
    onChange: (e: any, name: string, value?: any) => void,
    values: any
}

const initSerice: Service = { category: '', title: '', price: 0, duration: 0, available: true }

const Services: React.FC<Props> = (props) => {

    const [Service, setService] = useState<Service>(initSerice); // Hold the cuurent service
    const [Error, setError] = useState<string>('');
    const [AutoComplete, setAutoComplete] = useState<AutoCompleteState>({
        showOptions: false,
        filteredOptions: [],
        activeOption: 0
    });
    const [EditMode, setEditMode] = useState<boolean>(false);

    // Initial filteredOptions array in options
    const onCategoryChange = (e: any) => {
        const options = Object.keys(props.values.services);
        const userInput = e.currentTarget.value;

        const filteredOptions = options.filter(
            (optionName) =>
                optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        setAutoComplete({
            ...AutoComplete,
            activeOption: 0,
            filteredOptions: filteredOptions.slice(0, 5),
            showOptions: true,
        });
        setService({ ...Service, 'category': userInput })
    };

    // Invoke when user click on category name in autocomplete
    const onCategoryClick = (title: string) => {
        setService({ ...Service, 'category': title })
        setAutoComplete({
            ...AutoComplete,
            showOptions: false
        });
    };

    // Show all the services that added
    const AllServices = () => {
        const serivcesList: JSX.Element[] = [];

        for (var key in props.values.services) {
            console.log(props.values.services);

            if (!props.values.services[key]) continue;
            props.values.services[key].forEach((s: Service) => {
                serivcesList.push(<p onClick={() => editService(s)} key={s.price * s.duration}>{s.title}</p>)
            });
        }
        return serivcesList;
    }

    // Invoke when user click on existing service
    const editService = (service: Service) => {
        setService(service);
        setEditMode(true)
    }

    // Add new service 
    const addNewService = (e: any, service: Service) => {
        if (!service.category) {
            setError('כל שירות חייב להיות משוייך לקטגוריה')
        }
        else if (!service.title) {
            setError('כותרת ריקה')
        }
        else if (!service.price) {
            setError('לא הוזן מחיר')
        }
        else if (!service.duration) {
            setError('לא הוזן זמן')
        }
        else {
            const services = props.values.services;
            if (EditMode) {
                const findService = (s: Service) => s.id === Service.id;
                const i = services[Service.category].findIndex(findService);
                services[Service.category].splice(i, 1);
            }
            if (!services[service.category]) {
                services[service.category] = [];
            }
            service.id = uniqueId();
            services[service.category].push(service);
            props.onChange(e, 'services', services);
            setService(initSerice);
            setError('');
            setEditMode(false);
        }
    }
    console.log(cloneDeep(props.values.services));


    // AutoComplete Item
    let optionList;
    if (AutoComplete.showOptions && Service.category) {
        if (AutoComplete.filteredOptions.length) {
            optionList = (
                <div className={ServicesStyle.List}>
                    {AutoComplete.filteredOptions.map((optionName, index) => {
                        return (
                            <p
                                onClick={() => onCategoryClick(optionName)}
                                key={optionName}
                            >
                                {optionName + " "}
                            </p>
                        );
                    })}
                </div>
            );
        }
    }


    return (
        <div className={ServicesStyle.Services}>
            <div className={ManagerRegistrationStyle.Header}>
                <p className={ManagerRegistrationStyle.Title}>הוספת שירותים</p>
                <p className={ManagerRegistrationStyle.SubTitle}>הוסף את כל השירותים שהעסק שלך מציע.</p>
            </div>

            {Error && <p className={ManagerRegistrationStyle.Error}>{Error}</p>}


            <div className={ManagerRegistrationStyle.Body}>

                {/* Category Name */}
                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="category">קטגוריה *</label>
                    <input id="category" name="category" required={true} type="text"
                        value={Service.category} onChange={onCategoryChange} />
                </div>

                {/* AutoComplete */}
                <div className={ServicesStyle.Options}>{optionList}</div>

                {/* Service Name */}
                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="title">שם השירות *</label>

                    <input id="title" name="title" required={true} type="text" value={Service.title}
                        onChange={(e) => setService({ ...Service, 'title': e.target.value })} />
                </div>

                {/* Service Price */}
                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="price">מחיר*</label>

                    <input id="price" name="price" required={true} type="number" value={Service.price}
                        onChange={(e) => setService({ ...Service, 'price': parseInt(e.target.value) })} />
                </div>

                {/* Service Duration */}
                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="duration">משך זמן*</label>

                    <input id="duration" name="duration" required={true} type="number" value={Service.duration}
                        onChange={(e) => setService({ ...Service, 'duration': parseInt(e.target.value) })} />
                </div>
            </div>

            <div className={ServicesStyle.ServicesList}>
                {
                    AllServices()
                }
            </div>
            <div className={ServicesStyle.Button}>
                <Button border={true} onClick={(e: any) => addNewService(e, Service)} color='purple-register'>הוסף שירות</Button>
            </div>

            <div className={BusinessRegistrationStyle.Button}  >
                <Button onClick={() => props.step('decrement')} color='orange'>חזור</Button>
                <Button onClick={() => props.step('increment')} color='purple-register'>המשך</Button>
            </div>

        </div>
    )
}


export default Services;