
import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL  } from './actions-types'
import api from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const getAllProducts = (page = 1, limit = 100) => {
    return async function (dispatch) {
        try {
            const { data } = await api.get(`api/products/all?page=${page}&limit=${limit}`);
            // return 
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: data
            })
        } catch (error) {
            toast.error(error.response.data.error.message)
            console.log(error.response.data.error.message);
        }
    }
}

export const getProductDetail = (id) => {
    return async function (dispatch) {
        try {
            const { data } = await api.get(`api/products/${id}`);
            // return 
            dispatch({
                type: GET_PRODUCT_DETAIL,
                payload: data
            })
            console.log("DATA-ACTIONS:",data);
        } catch (error) {
            toast.error(error.response.data.error.error)
            console.log("ERROR", error);
        }
    }
}

