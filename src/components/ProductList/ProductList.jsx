import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../redux/actions/actions";
import { Link } from "react-router-dom";

function ProductList() {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.data);

    useEffect(() => {
        dispatch(getAllProducts())
    }, [ dispatch])
    return (
        <div className="container  mx-auto pt-4 sm:pt-6 px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {products?.map((product) => (
                    <div
                        key={product.id}
                        // className="bg-gray-800 overflow-hidden shadow-md sm:rounded-lg border border-gray-600 text-white"
                        className="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl w-full max-w-sm mx-auto"
                    >
                        <div className="relative mx-4 mt-4 overflow-hidden rounded-xl h-64">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-base font-medium text-blue-gray-900">
                                    {product.name}
                                </p>
                                <p className="text-base font-medium text-blue-gray-900">
                                    ${product.price}
                                </p>
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            <Link title="Detail Product" to={`/products/${product.id}`}>
                                <button
                                    className="text-white bg-[#1a3766] hover:bg-[#0f192a]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                                    type="button"
                                >
                                    View Detail
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ProductList