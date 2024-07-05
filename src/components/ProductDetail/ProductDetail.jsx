import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProductDetail } from "../../redux/actions/actions";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import ProductForm from "../ProductForm/ProductForm";
import 'react-confirm-alert/src/react-confirm-alert.css';
import confirmDelete from "../../common/utils/ConfirmAlert";

const ProductDetail = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const productDetail = useSelector((state) => state.productDetail);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getProductDetail(productId));
    }, [dispatch, productId]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        dispatch(getProductDetail(productId));
        setIsModalOpen(false);
    };


const handleDelete = (productId) => {
    const message = "Are you sure you want to remove this product?";
    confirmDelete({
        message,
        onConfirm: () => {
            dispatch(deleteProduct(productId));
            navigate('/products');
        }
    });
};

    return (
        <div className="container mx-auto pt-8 px-4">
            {productDetail && (
                <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg w-full lg:w-3/4 mx-auto">
                    <div className="flex justify-end w-full mb-4">
                        <button
                            onClick={openModal}
                            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => handleDelete(productId)}
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >
                            Delete
                        </button>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-8 w-full">
                        <img
                            src={productDetail.image}
                            alt={productDetail.name}
                            className="w-full lg:w-2/5 h-auto object-cover object-center rounded-lg shadow-md"
                        />
                        <div className="w-full lg:w-3/5">
                            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold text-gray-200 mb-4 break-words overflow-hidden">
                                    {productDetail.name}
                                </h2>
                                <table className="min-w-full divide-y divide-gray-400 table-fixed">
                                    <tbody className="bg-gray-700 divide-y divide-gray-400">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-normal break-words">
                                                <div className="text-sm text-gray-200">Name</div>
                                                <div className="text-lg font-medium text-white">{productDetail.name}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-200">Price</div>
                                                <div className="text-lg font-medium text-white">${productDetail.price}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-200">Type</div>
                                                <div className="text-lg font-medium text-white">{productDetail.type}</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5 h-auto mx-auto my-auto p-2 bg-white rounded-lg shadow-lg"
                        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    >
                        <ProductForm
                            product={productDetail}
                            closeModal={closeModal}
                            isUpdating={true}
                        />
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
