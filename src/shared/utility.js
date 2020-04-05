export const checkValidity = (value, rules, password) => {
    if (rules.required && value.trim() === '') {
        return false;
    }

    if (rules.minLength && value.length < rules.minLength) {
        return false;
    }

    if (rules.maxLength && value.length > rules.minLength) {
        return false;
    }

    if (rules.isEmail && !(/[\w-]+@([\w-]+\.)+[\w-]+/.test(value))) {
        return false;
    }

    if (rules.isNumeric && /^\d+$/.test(value)) {
        return false;
    }

    if (rules.confirmPassword && value !== password) {
        return false;
    }

    return true;
}