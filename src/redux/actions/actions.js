
import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, POST_PRODUCT } from './actions-types'
import api from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const getAllProducts = (page = 1, limit = 10) => {
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
            console.log("DATA-ACTIONS:", data);
        } catch (error) {
            toast.error(error.response.data.error.error)
            console.log("ERROR", error);
        }
    }
}

export function postProduct(payload) {
    return async function (dispatch) {
        try {
            await api.post('api/products/create', payload);
            dispatch({
                type: POST_PRODUCT,
                payload: payload
            })
            toast.success('Product created successfully');
        } catch (error) {
            const errorData = error.response.data.error.message;
            // console.log("ERRORACTIONSPRODUCTFORM:", errorData);
            errorData.map((element) => {
                return (
                    toast.error(element)
                )
            })
            console.log("ERROR", error);
        }
    }
}

