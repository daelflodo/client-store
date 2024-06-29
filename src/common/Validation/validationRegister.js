import { emailPattern, strongPasswordPattern } from "../constants/constants";

const validationRegister = (registerData) => {
    const errors = {};

    if (!registerData.fullName) {
        errors.fullName = 'Ingrese el Nombre!';
    }
    if (!registerData.email) {
        errors.email = 'Ingrese el email!';
    }
    if (!emailPattern.test(registerData.email)) {
        errors.email = 'El email no es válido';
    }

    if (!registerData.password) {
        errors.password = 'Ingrese un precio';
    }
    if (!strongPasswordPattern.test(registerData.password)) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial';
    }

    return errors;
};

export default validationRegister;