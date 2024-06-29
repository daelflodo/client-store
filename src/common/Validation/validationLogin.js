import { emailPattern, strongPasswordPattern } from "../constants/constants";

const validationLogin = (loginData) => {
    const errors = {};

    if (!loginData.email) {
        errors.email = 'Ingrese el email!';
    }
    if (!emailPattern.test(loginData.email)) {
        errors.email = 'El email no es válido';
    }

    if (!loginData.password) {
        errors.password = 'Ingrese un precio';
    }
    if (!strongPasswordPattern.test(loginData.password)) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial';
    }

    return errors;
};

export default validationLogin;