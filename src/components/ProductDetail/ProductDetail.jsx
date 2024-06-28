import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const productDetail = useSelector((state) => state.productDetail);

    useEffect(() => {
        dispatch(getProductDetail(productId));
    }, [dispatch, productId])

    return (
        <div className="container mx-auto pt-8 px-4">
            {productDetail && (
                <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg">
                    <div className="flex items-start space-x-8">
                        <img
                            src={productDetail.image}
                            alt={productDetail.name}
                            className="w-2/5 h-auto object-cover object-center rounded-lg shadow-md"
                        />
                        <div className="w-full">
                            <table className="min-w-full divide-y divide-gray-400" style={{ height: '330px' }}>
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
                </div>
            )}
        </div>
    )
}

export default ProductDetail;