import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { producetDetailsReducer, producetListReducer } from './reducers/productReducers';
import { usserRegisterReducer, usserSigninReducer } from './reducers/userReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    },
};

const reducer = combineReducers({
    productList: producetListReducer,
    productDetails: producetDetailsReducer,
    cart: cartReducer,
    userSignin: usserSigninReducer,
    userRegister: usserRegisterReducer
});


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;