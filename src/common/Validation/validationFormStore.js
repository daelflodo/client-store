import { cityRegex } from "../constants/constants";

const validationFormStore = (formDataStore) => {
    const errors = {};

    if (!formDataStore.name) {
        errors.name = 'Ingrese el nombre de la tienda!';
    }

    if (formDataStore.city.length !== 3) {
        errors.city = 'La ciudad es un código de tres caracteres';
    }
    if (!formDataStore.city) {
        errors.city = 'Ingrese la ciudad';
    }

    if (!cityRegex.test(formDataStore.city)) {
        errors.city = 'La ciudad debe contener solo letras';
    }

    if (!formDataStore.address) {
        errors.address = 'Ingrese la direccion';
    }

    return errors;
};

export default validationFormStore;