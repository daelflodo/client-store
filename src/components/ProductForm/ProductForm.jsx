import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductDetail, postProduct, updateProduct } from "../../redux/actions/actions";
import { toast } from "react-toastify";
import validationFormProduct from '../../common/Validation/validationFormProduct'
import axios from "axios";

const ProductForm = ({ product, closeModal, isUpdating }) => {
    const dispatch = useDispatch();

    const [formDataProduct, setFormDataProduct] = useState({
        name: product ? product.name : "",
        price: product ? product.price : "",
        type: product ? product.type : "Perecedero",
        image: product ? product.image : ""
    });

    const [errorName, setErrorName] = useState("");
    const [errorPrice, setErrorPrice] = useState("");
    const [errorType, setErrorType] = useState("");
    const [errorImage, setErrorImage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (errorName || errorPrice || errorType) {
            toast.error("Missing data");
            return;
        }

        if (!formDataProduct.image) {
            setErrorImage("Selecione una imagen");
            return;
        }

        if (isUpdating) {
            dispatch(updateProduct(product.id, formDataProduct));
            dispatch(getProductDetail(product.id))
            closeModal();
        } else {
            dispatch(postProduct(formDataProduct));
        }

        setFormDataProduct({
            name: "",
            price: "",
            type: "",
            image: ""
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormDataProduct({
            ...formDataProduct,
            [name]: value
        });

        validateField(name, value);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "product_upload");

        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dyjg05g3r/image/upload",
                formData
            );
            const imageUrl = res.data.secure_url;
            setFormDataProduct({
                ...formDataProduct,
                image: imageUrl
            });
            setErrorImage(""); // Limpiar el error cuando se carga la imagen correctamente
        } catch (error) {
            console.error("Error uploading image: ", error);
            toast.error("Error uploading image");
        }
    };

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                setErrorName(validationFormProduct({ ...formDataProduct, [fieldName]: value })[fieldName]);
                break;
            case 'price':
                setErrorPrice(validationFormProduct({ ...formDataProduct, [fieldName]: value })[fieldName]);
                break;
            case 'type':
                setErrorType(validationFormProduct({ ...formDataProduct, [fieldName]: value })[fieldName]);
                break;
            default:
                break;
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-700">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {isUpdating ? "Update Product" : "Add Product"}
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Name
                                </label>
                                {errorName && <p style={{ color: "red" }}>{errorName}</p>}
                                <input
                                    value={formDataProduct.name}
                                    onChange={handleChange}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Price
                                </label>
                                {errorPrice && <p style={{ color: "red" }}>{errorPrice}</p>}
                                <input
                                    value={formDataProduct.price}
                                    onChange={handleChange}
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="type"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Type
                                </label>
                                {errorType && <p style={{ color: "red" }}>{errorType}</p>}
                                <select
                                    value={formDataProduct.type}
                                    onChange={handleChange}
                                    name="type"
                                    id="type"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="Perecedero">Perecedero</option>
                                    <option value="No-perecedero">No perecedero</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Image
                                </label>
                                {errorImage && <p style={{ color: "red" }}>{errorImage}</p>}
                                <input
                                    onChange={handleImageUpload}
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {isUpdating ? "Update Product" : "Add Product"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductForm;
