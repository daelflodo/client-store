
import { ADD_STORE_TO_PRODUCT, DELETE_PRODUCT, DELETE_STORES, DELETE_STORES_FOR_PRODUCT, GET_ALL_PRODUCTS, GET_ALL_STORES, GET_PRODUCT_DETAIL, GET_STORES_DETAIL, GET_STORES_FOR_PRODUCT, LOGIN, POST_PRODUCT, POST_STORES, REGISTER, UPDATE_PRODUCT, UPDATE_STORES } from './actions-types'
import api from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const getAllProducts = (page = 1, limit = 10) => {
    return async function (dispatch) {
        try {
            const { data } = await api.get(`api/products/all?page=${page}&limit=${limit}`);
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: data
            })
        } catch (error) {
            toast.error(error.response.data.error.message)
        }
    }
}

export const getProductDetail = (id) => {
    return async function (dispatch) {
        try {
            const { data } = await api.get(`api/products/${id}`);
            dispatch({
                type: GET_PRODUCT_DETAIL,
                payload: data
            })
        } catch (error) {
            toast.error(error.response.data.error.message)
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
            });
            toast.success('Product created successfully');
        } catch (error) {
            const errorData = error.response?.data.error.message;
            if (Array.isArray(errorData)) {
                errorData.forEach((element) => {
                    toast.error(element);
                });
            } else if (typeof errorData === 'string') {
                toast.error(errorData);
            } else {
                toast.error('Failed to create product');
            }
        }
    };
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
        }
    };
};

export const deleteProduct = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await api.delete(`api/products/delete/${id}`);
            dispatch({
                type: DELETE_PRODUCT,
                payload: id
            });
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response?.data.error.message)
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
        }
    };
};

export const deleteStore = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await api.delete(`api/stores/delete/${id}`);
            dispatch({
                type: DELETE_STORES,
                payload: id
            });
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.error.message)
        }
    };
};

export const addStoreToProduct = (productId, storeId) => {
    return async (dispatch) => {
        try {
            const { data } = await api.post(`api/products/${productId}/store/${storeId}`);
            dispatch({
                type: ADD_STORE_TO_PRODUCT,
                payload: data,
            });
            toast.success('Store added to product successfully');
        } catch (error) {
            toast.error(error.response?.data.error.message);
        }
    };
};

export const getStoresForProduct = (productId) => {
    return async (dispatch) => {
        try {
            const { data } = await api.get(`api/products/${productId}/stores`);
            dispatch({
                type: GET_STORES_FOR_PRODUCT,
                payload: { productId, stores: data },
            });
        } catch (error) {
            toast.error(error.response.data.error.message);
        }
    };
};

export const deleteStoreToProduct = (productId, storeId) => {
    return async (dispatch) => {
        try {
            const { data } = await api.delete(`api/products/${productId}/stores/${storeId}`);
            dispatch({
                type: DELETE_STORES_FOR_PRODUCT,
                payload: data
            });
            toast.success('The product was removed from the store')
        } catch (error) {
            toast.error(error.response.data.error.message)
        }
    };
};

export const loginUser = (userData) => {
    return async (dispatch) => {
        try {
            const { data } = await api.post(`/api/auth/login`, userData);
            const { accessToken, user } = data;
            if (accessToken && user) {
                localStorage.setItem('accessToken', accessToken);
                dispatch({
                    type: LOGIN,
                    payload: {
                        accessToken: accessToken,
                        user: user
                    }
                });
                return toast.success(`Inicio de session exitoso con ${data.user.fullName}`);
            }
        } catch (error) {
            if (error.response.data.error.message[0] && error.response.data.error.statusCode === 400) {
                toast.error('Missing Data')
            } else {
                toast.error(`Error: ${error.response.data.error.message}`)
            }
        }
    }
};

export function postRegister(payload) {
    return async function (dispatch) {
        try {
            await api.post('api/user/create', payload);
            dispatch({
                type: REGISTER,
                payload: payload
            })
            toast.success('Successfully registered user');
        } catch (error) {
            if (error.response.data.error.message[0] && error.response.data.error.statusCode === 400) {
                toast.error('Missing Data')
            } else {
                toast.error(`Error: ${error.response.data.error.message}`)
            }
        }
    }
}

