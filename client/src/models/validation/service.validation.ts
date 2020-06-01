import { Service } from "../system/service";
import * as language from '../../assets/language/language';

export const validationService = (service: Service) => {
    if (service.category.length < 1 || service.title.length < 2)
        return language.domainLengthError[1];
    else if (service.price <= 0)
        return language.priceError[1];
    else if (service.duration <= 5)
        return language.durationError[1]
    return '';
}