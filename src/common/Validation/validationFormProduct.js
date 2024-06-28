import { ProductTypeList, urlPattern } from "../constants/constants";

const validationFormProduct = (formDataProduct) => {
    const errors = {};
    if (!formDataProduct.name) {
        errors.name = 'Ingrese un nombre para el producto!';
    }

    if (formDataProduct.price <= 0) {
        errors.price = 'Ingrese un valor positivo';
    }
    if (!formDataProduct.price) {
        errors.price = 'Ingrese un precio';
    }

    if (!formDataProduct.type) {
        errors.type = `El tipo del producto está vacío. Los tipos válidos son ${ProductTypeList.join(', ')}`;
    }
    if (!ProductTypeList.includes(formDataProduct.type)) {
        errors.type = `Tipo de producto no válido. Los tipos válidos son ${ProductTypeList.join(', ')}`;
    }

    if (!formDataProduct.image) {
        errors.image = 'Introduzca una URL para la imagen';
    }
    if (!urlPattern.test(formDataProduct.image)) {
        errors.image = 'La URL de la imagen no es válida';
    }

    return errors;
}

export default validationFormProduct;