import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authenticationSlice'
import cartsReducer from './cartSlice'

/**
 * To configure the store redux. 
 * 
 * @author Peter Mollet
 */
 export const store = configureStore({
	reducer: {
		auth: authenticationReducer,
		carts: cartsReducer,
	},
});
