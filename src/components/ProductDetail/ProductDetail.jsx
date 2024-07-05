import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProductDetail } from "../../redux/actions/actions";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import ProductForm from "../ProductForm/ProductForm";

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
        dispatch(getProductDetail(productId))
        setIsModalOpen(false);
    };

    const handleDelete = (productId) => {
        dispatch(deleteProduct(productId));
        navigate('/products');
    };

    return (
        <div className="container mx-auto pt-8 px-4">
            {productDetail && (
                <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg w-full lg:w-3/4 mx-auto">
                    <div className="flex justify-between w-full mb-4">
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
                        <div className="w-full">
                            <table className="min-w-full divide-y divide-gray-400">
                                <tbody className="bg-gray-700 divide-y divide-gray-400">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-200">Name: {productDetail.name}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-200">Price: ${productDetail.price}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-200">Type: {productDetail.type}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto mx-auto my-auto p-5"
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
