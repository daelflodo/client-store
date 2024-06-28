
import { DELETE_PRODUCT, DELETE_STORES, GET_ALL_PRODUCTS, GET_ALL_STORES, GET_PRODUCT_DETAIL, GET_STORES_DETAIL, POST_PRODUCT, POST_STORES, UPDATE_PRODUCT, UPDATE_STORES } from './actions-types'
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
            errorData.map((element) => {
                return (
                    toast.error(element)
                )
            })
            console.log("ERROR", error);
        }
    }
}

export const updateProduct = (id, payload) => {
    return async (dispatch) => {
        try {
            await api.patch(`api/products/edit/${id}`, payload);
            dispatch({
                type: UPDATE_PRODUCT,
                payload: {
                    updatedProduct: payload,
                },
            });
            toast.success('The product was updated successfully');
        } catch (error) {
            toast.error(error.response.data.error.message)
            console.log("ERROR", error);
        }
    };
};

export const deleteProduct = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await api.delete(`api/products/delete/${id}`);
            dispatch({
                type: DELETE_PRODUCT,
                payload: data
            });
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.error.message)
        }
    };
};

export const getAllStores = () => {
    return async function (dispatch) {
        try {
            const { data } = await api.get(`api/stores/all`);
            return dispatch({
                type: GET_ALL_STORES,
                payload: data
            })
        } catch (error) {
            toast.error(error.response.data.error.message)
        }
    }
}

export const getStoreDetail = (id) => {
    return async function (dispatch) {
        try {
            const { data } = await api.get(`api/stores/${id}`);
            return dispatch({
                type: GET_STORES_DETAIL,
                payload: data
            })
        } catch (error) {
            toast.error(error.response.data.error.message)
            console.log("ERROR", error);
        }
    }
}

export function postStores(payload) {
    return async function (dispatch) {
        try {
            await api.post('api/stores/create', payload);
            dispatch({
                type: POST_STORES,
                payload: payload
            })
            toast.success('Store created successfully');
        } catch (error) {
            const errorData = error.response.data.error.message;
            errorData.map((element) => {
                return (
                    toast.error(element)
                )
            })
            console.log("ERROR", error);
        }
    }
}

export const updateStore = (id, payload) => {
    return async (dispatch) => {
        try {
            await api.patch(`api/stores/edit/${id}`, payload)
            dispatch({
                type: UPDATE_STORES,
                payload: {
                    updateStore: payload
                }
            });
            toast.success('The stores was updated successfully');
        } catch (error) {
            toast.error(error.response.data.error.message)
            console.log("ERROR", error);
        }
    };
};

export const deleteStore = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await api.delete(`api/stores/delete/${id}`);
            dispatch({
                type: DELETE_STORES,
                payload: data
            });
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.error.message)
        }
    };
};

