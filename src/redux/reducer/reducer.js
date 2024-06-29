import { ADD_STORE_TO_PRODUCT, GET_ALL_PRODUCTS, GET_ALL_STORES, GET_PRODUCT_DETAIL, GET_STORES_DETAIL, GET_STORES_FOR_PRODUCT, LOGIN, POST_PRODUCT, POST_STORES } from "../actions/actions-types"

const initialState = {
    products: [],
    productDetail: "",
    stores: [],
    storeDetail: "",
    storesForProduct: {},
    user: null,
    accessToken: null,
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
        case ADD_STORE_TO_PRODUCT:
            return {
                ...state,
                productDetail: {
                    ...state.productDetail,
                    stores: [...(state.productDetail.stores || []), payload],
                },
            };
        case GET_STORES_FOR_PRODUCT:
            return {
                ...state,
                storesForProduct: {
                    ...state.storesForProduct,
                    [payload.productId]: payload.stores,
                },
            };
        case LOGIN:
            return {
                ...state,
                user: payload.user,
                accessToken: payload.accessToken
            }
        default:
            return { ...state }
    }
}

export default rootReducer