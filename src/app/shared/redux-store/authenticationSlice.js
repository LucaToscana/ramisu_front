import { setToken } from './../../shared/services/tokenServices';
import { isAuthenticated , isAdmin } from '../../shared/services/accountServices';
import { createSlice } from '@reduxjs/toolkit';

/**
 * initial state: is logged check if the user is already authenticated when openning the Application
 * @author Peter Mollet
 */
 const initialState = { 
    isLogged : isAuthenticated() ,
    isAdmin : isAdmin()
}

export const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action) => {
            setToken(action.payload);
            state.isLogged = true;
            state.isAdmin = isAdmin();
        },
        signOut: (state) => {
            localStorage.setItem("token","");
            sessionStorage.clear();
            state.isLogged = false;
            state.isAdmin = false;
        }
    }
})

export const { signIn, signOut } = authenticationSlice.actions;

export const selectIsLogged = (state) => state.auth.isLogged;

export const selectIsLoggedAdmin = (state) => state.auth.isAdmin;

export default authenticationSlice.reducer