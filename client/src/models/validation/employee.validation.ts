import * as language from '../../assets/language/language';
import { Employee } from '../system/employee';

export const validationEmployee = (employee: Employee, validPassword?: string) => {
    const phone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (employee.password !== validPassword) {
        return language.confirmPasswordError[1];
    } else if (!phone.test(employee.phone)) {
        return language.phoneError[1];
    }
    return '';
}