import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStoreToProduct, deleteStoreToProduct, getAllProducts, getStoresForProduct } from "../../redux/actions/actions";
import { Link } from "react-router-dom";

const ProductStores = ({ storeId }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.data); // All products
    const storesForProduct = useSelector((state) => state.storesForProduct);
    const [storeProducts, setStoreProducts] = useState([]); // Products belonging to this store
    const [selectedProduct, setSelectedProduct] = useState('');

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products?.length > 0) {
            products?.forEach(product => {
                dispatch(getStoresForProduct(product.id));
            });
        }
    }, [dispatch, products]);

    useEffect(() => {
        const filteredProducts = products?.filter(product => {
            const stores = storesForProduct[product.id] || [];
            return stores?.some(store => store.id === storeId);
        });
        setStoreProducts(filteredProducts);
    }, [products, storesForProduct, storeId]);

    const handleAddProduct = () => {
        if (selectedProduct) {
            dispatch(addStoreToProduct(selectedProduct, storeId));
            dispatch(getAllProducts());
        }
    };

    const handleDeleteStoreToProduct = (productId) => {
        dispatch(deleteStoreToProduct(productId, storeId));
        dispatch(getAllProducts());
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 mt-6">
                <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="text-sm px-4 py-2 border rounded-lg w-full sm:w-auto"
                >
                    <option value="" disabled>Select Product</option>
                    {products?.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </select>
                <button
                    onClick={handleAddProduct}
                    className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
                >
                    Add Product
                </button>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-10 px-5">
                <h3 className="text-lg text-white">Products in this store:</h3>
                <div className="grid grid-cols-1 py-5 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {storeProducts?.map(product => (
                        <div key={product.id} className="bg-gray-800 overflow-hidden shadow-md sm:rounded-lg border border-gray-600">
                            <div className="px-6 py-4">
                                <div className="font-medium text-gray-900 dark:text-white mb-2">{product.name}</div>
                            </div>
                            <div className="px-6 py-4 bg-gray-700 dark:bg-gray-900 flex justify-end">
                                <button
                                    onClick={() => handleDeleteStoreToProduct(product.id)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mr-4">
                                    Delete
                                </button>
                                <Link to={`/products/${product.id}`}>
                                    <button
                                        className="font-medium text-green-600 dark:text-green-500 hover:underline mr-4">
                                        Detail
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductStores;
