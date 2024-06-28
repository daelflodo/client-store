import { GET_ALL_PRODUCTS } from "../actions/actions-types"

const initialState = {
    products: []
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: payload,
            };
        default:
            return { ...state }
    }
}

export default rootReducer