import { setToken } from './../../shared/services/tokenServices';
import { isAuthenticated } from '../../shared/services/accountServices';
import { createSlice } from '@reduxjs/toolkit';

/**
 * initial state: is logged check if the user is already authenticated when openning the Application
 * @author Peter Mollet
 */
 const initialState = { 
    isLogged : isAuthenticated() 
}

export const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action) => {
            setToken(action.payload)
            state.isLogged = true
        },
        signOut: (state) => {
            localStorage.setItem("token","")
            sessionStorage.clear()
            state.isLogged = false
        }
    }
})

export const { signIn, signOut } = authenticationSlice.actions

export const selectIsLogged = (state) => state.auth.isLogged

export default authenticationSlice.reducer