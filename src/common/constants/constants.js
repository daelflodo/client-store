export const ProductType = {
    Perecedero: 'Perecedero',
    NoPerecedero: 'No-perecedero'
};

// Lista de tipos de producto válidos
export const ProductTypeList = [
    ProductType.NoPerecedero,
    ProductType.Perecedero,
];

export const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
