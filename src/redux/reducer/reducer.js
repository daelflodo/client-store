import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, POST_PRODUCT } from "../actions/actions-types"

const initialState = {
    products: [],
    productDetail: "",
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: payload,
            };
        case GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: payload,
            }
        case POST_PRODUCT:
            return {
                ...state,
                products: [...state.products, payload]
            }
        default:
            return { ...state }
    }
}

export default rootReducer