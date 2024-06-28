import { useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct, updateProduct } from "../../redux/actions/actions";
import { toast } from "react-toastify";
import validationFormProduct from "../../common/Validation/validationFormProduct";

const ProductForm = ({ product, closeModal, isUpdating }) => {
    const dispatch = useDispatch();
    const [formDataProduct, setFormDataProduct] = useState({
        name: product ? product.name : "",
        price: product ? product.price : "",
        type: product ? product.type : "Perecedero",
        image: product ? product.image : ""
    });
    const [errorFormProduct, setErrorFormProduct] = useState({})



    const handleSubmit = (event) => {
        event.preventDefault()

        if (Object.keys(errorFormProduct).length !== 0) {
            toast.error('Missing data');
            return
        }

        if (isUpdating) {
            dispatch(updateProduct(product.id, formDataProduct));
        } else {
            dispatch(postProduct(formDataProduct));
        }

        setFormDataProduct({
            name: "",
            price: "",
            type: "",
            image: ""
        });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormDataProduct({
            ...formDataProduct,
            [name]: value
        });

        setErrorFormProduct(validationFormProduct({
            ...formDataProduct,
            [event.target.name]: event.target.value
        }))
    }

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
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Name
                                </label>
                                {errorFormProduct.name && <p style={{ color: "red" }}>{errorFormProduct.name}</p>}
                                <input
                                    value={formDataProduct.name}
                                    onChange={handleChange}
                                    type="name"
                                    name="name" id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Price
                                </label>
                                {errorFormProduct.price && <p style={{ color: "red" }}>{errorFormProduct.price}</p>}
                                <input
                                    value={formDataProduct.price}
                                    onChange={handleChange}
                                    type="price" name="price"
                                    id="price" placeholder=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="type"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Type
                                </label>
                                {errorFormProduct.type && <p style={{ color: "red" }}>{errorFormProduct.type}</p>}
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
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Image
                                </label>
                                {errorFormProduct.image && <p style={{ color: "red" }}>{errorFormProduct.image}</p>}
                                <input
                                    value={formDataProduct.image}
                                    onChange={handleChange}
                                    type="img"
                                    name="image"
                                    id="image"
                                    placeholder=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                {isUpdating ? "Update Product" : "Add Product"}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
}


export default ProductForm