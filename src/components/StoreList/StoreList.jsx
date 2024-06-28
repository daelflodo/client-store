import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStores } from "../../redux/actions/actions";

const StoreList = () => {
    const dispatch = useDispatch();
    const stores = useSelector((state) => state.stores);

    useEffect(() => {
        dispatch(getAllStores())
    }, [dispatch])

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-10 px-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {stores.map((store) => (
                    <div key={store.id} className="bg-gray-800 overflow-hidden shadow-md sm:rounded-lg">
                        <div className="px-6 py-4">
                            <div className="font-medium text-gray-900 dark:text-white mb-2">{store.name}</div>
                            <div className="text-gray-400 dark:text-gray-300">{store.city}</div>
                        </div>
                        <div className="px-6 py-4 bg-gray-700 dark:bg-gray-900 flex justify-end">
                            <a href={`/stores/${store.id}`} className="font-medium text-green-600 dark:text-green-500 hover:underline mr-4">Detail</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StoreList;