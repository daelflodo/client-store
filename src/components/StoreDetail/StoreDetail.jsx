import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStore, getStoreDetail } from "../../redux/actions/actions";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import StoreForm from "../StoreForm/StoreForm";
import ProductStores from "../ProductStores/ProductStores";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const StoreDetail = () => {
    const { id: storeId } = useParams();
    const dispatch = useDispatch();
    const storeDetail = useSelector((state) => state.storeDetail);
    const navigate = useNavigate();

    const products = useSelector((state) => state.products.data);
    const storesForProduct = useSelector((state) => state.storesForProduct);
    const [hasProduct, setHasProduct] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storeHasProduct = products?.some((product) => {
            return storesForProduct[product.id]?.some(store => store.id === storeId)
        });
        setHasProduct(storeHasProduct);
    }, [products, storesForProduct, storeId]);

    useEffect(() => {
        dispatch(getStoreDetail(storeId));
    }, [dispatch, storeId]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        dispatch(getStoreDetail(storeId));
        setIsModalOpen(false);
    };

    const handleDeleteStore = (storeId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <h2 className="text-lg font-semibold mb-4">Confirm deletion</h2>
                        <p className="text-gray-700 mb-4">Are you sure you want to delete this store?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                                onClick={() => {
                                    if (!hasProduct) {
                                        dispatch(deleteStore(storeId));
                                        navigate('/stores');
                                        onClose();
                                    } else {
                                        toast.error('Cannot delete store with associated products');
                                        onClose();
                                    }
                                }}
                            >
                                Ok
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                );
            }
        });
    };

    return (
        <div className="container mx-auto pt-8 px-4">
            <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg w-full lg:w-3/4 mx-auto">
                <div className="flex justify-end w-full mb-4">
                    <button
                        onClick={openModal}
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => handleDeleteStore(storeId)}
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                        Delete
                    </button>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-8 w-full">
                    <div className="w-full">
                        <div className="min-w-full divide-y divide-gray-400">
                            <div className="bg-gray-700 divide-y divide-gray-400 flex flex-col lg:flex-row">
                                <div className="px-6 py-4 flex-1">
                                    <div className="text-sm text-gray-200">Name:</div>
                                    <div className="text-lg font-medium text-white">{storeDetail.name}</div>
                                </div>
                                <div className="px-6 py-4 flex-1">
                                    <div className="text-sm text-gray-200">City:</div>
                                    <div className="text-lg font-medium text-white">{storeDetail.city}</div>
                                </div>
                                <div className="px-6 py-4 flex-1">
                                    <div className="text-sm text-gray-200">Address:</div>
                                    <div className="text-lg font-medium text-white">{storeDetail.address}</div>
                                </div>
                            </div>
                        </div>
                        <ProductStores storeId={storeId} />
                    </div>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5 h-auto mx-auto my-auto p-2 bg-white rounded-lg shadow-lg"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                >
                    <StoreForm
                        store={storeDetail}
                        closeModal={closeModal}
                        isUpdating={true}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default StoreDetail;
