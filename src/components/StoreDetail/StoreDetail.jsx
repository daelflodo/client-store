import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStoreDetail } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";

const StoreDetail = () => {
    const { id: storeId } = useParams();
    const dispatch = useDispatch();
    const storeDetail = useSelector((state) => state.storeDetail)

    useEffect(() => {
        dispatch(getStoreDetail(storeId));
    }, [dispatch, storeId]);

    return (
        <div className="container mx-auto pt-8 px-4">
            <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="flex justify-between w-full mb-4">
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
            </div>
        </div>
    );
}

export default StoreDetail;