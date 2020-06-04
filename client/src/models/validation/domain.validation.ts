import * as language from '../../assets/language/language';

export const validationDomain = (domain: string) => {
    const english = /^[a-zA-Z]+$/;
    if (domain.length < 2) {
        return language.domainLengthError[1];
    }
    else if (!english.test(domain)) {
        return language.englishOnlyError[1];
    }
    return '';
}