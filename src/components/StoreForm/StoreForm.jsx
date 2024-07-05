import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllStores, getStoreDetail, postStores, updateStore } from "../../redux/actions/actions";
import validationFormStore from "../../common/Validation/validationFormStore";
import { toast } from "react-toastify";

const StoreForm = ({ store, closeModal, isUpdating }) => {
    const dispatch = useDispatch();

    const [formDataStore, setFormDataStore] = useState({
        name: store ? store.name : "",
        city: store ? store.city : "",
        address: store ? store.address : "",
    });

    const [errorName, setErrorName] = useState("");
    const [errorCity, setErrorCity] = useState("");
    const [errorAddress, setErrorAddress] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (errorName || errorCity || errorAddress) {
            toast.error('Missing data');
            return;
        }

        if (isUpdating) {
            dispatch(updateStore(store.id, formDataStore));
            dispatch(getStoreDetail(store.id))
        } else {
            dispatch(postStores(formDataStore));
            dispatch(getAllStores());
        }

        setFormDataStore({
            name: "",
            city: "",
            address: "",
        });

        if (isUpdating) {
            closeModal();
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormDataStore({
            ...formDataStore,
            [name]: value
        });

        validateField(name, value);
    };

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                setErrorName(validationFormStore({ ...formDataStore, [fieldName]: value })[fieldName]);
                break;
            case 'city':
                setErrorCity(validationFormStore({ ...formDataStore, [fieldName]: value })[fieldName]);
                break;
            case 'address':
                setErrorAddress(validationFormStore({ ...formDataStore, [fieldName]: value })[fieldName]);
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
                            {isUpdating ? "Update Stores" : "Add Stores"}
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Name
                                </label>
                                {errorName && <p style={{ color: "red" }}>{errorName}</p>}
                                <input
                                    value={formDataStore.name}
                                    onChange={handleChange}
                                    type="name"
                                    name="name" id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="city"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    City
                                </label>
                                {errorCity && <p style={{ color: "red" }}>{errorCity}</p>}
                                <input
                                    value={formDataStore.city}
                                    onChange={handleChange}
                                    type="city" name="city"
                                    id="city" placeholder=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="address"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Address
                                </label>
                                {errorAddress && <p style={{ color: "red" }}>{errorAddress}</p>}
                                <input
                                    value={formDataStore.address}
                                    onChange={handleChange}
                                    type="address" name="address"
                                    id="address" placeholder=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                {isUpdating ? "Update Stores" : "Add Stores"}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StoreForm;
