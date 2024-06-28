
import { GET_ALL_PRODUCTS  } from './actions-types'
import api from '../../services/api';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


export const getAllProducts = (page = 1, limit = 100) => {
    return async function (dispatch) {
        try {
            const { data } = await api.get(`api/products/all?page=${page}&limit=${limit}`);
            // return 
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: data
            })
            console.log("DATA-ACTIONS:",data);

        } catch (error) {
            // toast.error(error.response.data.error.message)
            console.log(error.response.data.error.message);
        }
    }
}

