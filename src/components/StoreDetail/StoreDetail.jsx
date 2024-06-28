import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStore, getStoreDetail } from "../../redux/actions/actions";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import StoreForm from "../StoreForm/StoreForm";


const StoreDetail = () => {
    const { id: storeId } = useParams();
    const dispatch = useDispatch();
    const storeDetail = useSelector((state) => state.storeDetail)
    const navigate = useNavigate();


    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getStoreDetail(storeId));
    }, [dispatch, storeId]);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleDeleteStore = (storeId) => {
        dispatch(deleteStore(storeId));
        navigate('/stores');
    };


    return (
        <div className="container mx-auto pt-8 px-4">
            <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="flex justify-between w-full mb-4">
                    <button
                        onClick={openModal}
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => handleDeleteStore(storeId)}
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                        Delete
                    </button>
                </div>

                <div className="flex items-start space-x-8">
                    <div className="w-full">
                        <div className="min-w-full divide-y divide-gray-400" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="bg-gray-700 divide-y divide-gray-400 flex">
                                <div className="px-6 py-4 whitespace-nowrap flex-1">
                                    <div className="text-sm text-gray-200">Name: {storeDetail.name}</div>
                                </div>
                                <div className="px-6 py-4 whitespace-nowrap flex-1">
                                    <div className="text-sm text-gray-200">City: {storeDetail.city}</div>
                                </div>
                                <div className="px-6 py-4 whitespace-nowrap flex-1">
                                    <div className="text-sm text-gray-200">Address: {storeDetail.address}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className="w-[45%] h-[45%] mx-auto my-auto p-5 py-5"
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
}

export default StoreDetail;