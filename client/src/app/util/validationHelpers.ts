export function isValidEmail(email : string) {
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(email);
}

export function getPasswordStrengthErrors(password : string) {
    if (password.length < 6)
        return 'Password must be at least 6 characters long';
    if (!/[a-z]/g.test(password))
        return 'Password must contain at least one lowercase character';
    if (!/[A-Z]/g.test(password))
        return 'Password must contain at least one uppsercase character';
    if (/^[a-zA-Z0-9]+$/.test(password))
        return 'Password must contain at least one non alphanumeric character';
    return true;
}