import { GET_ALL_PRODUCTS, GET_ALL_STORES, GET_PRODUCT_DETAIL, GET_STORES_DETAIL, POST_PRODUCT, POST_STORES } from "../actions/actions-types"

const initialState = {
    products: [],
    productDetail: "",
    stores: [],
    storeDetail: "",
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
        case GET_ALL_STORES:
            return {
                ...state,
                stores: payload,
            };
        case GET_STORES_DETAIL:
            return {
                ...state,
                storeDetail: payload,
            }
        case POST_STORES:
            return {
                ...state,
                stores: [...state.stores, payload]
            }
        default:
            return { ...state }
    }
}

export default rootReducer