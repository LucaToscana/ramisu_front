import { createSlice } from "@reduxjs/toolkit";

import defaultAvatar from '../../assets/images/default-avatar.png'

/**
 * 
 * 
**/

const initialState = {
  firstName: '',
  lastName: '',
  birthdate: '',
  mail: '',
  phone: '',
  number: '',
  street: '',
  city: '',
  postalCode: '',
  country: '',
  avatar: '',
  addressComplement: '',
  updated:false
}



export const userProfileSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setProfileInfo: (state, actions) => ({ ...state, ...actions.payload }),
    isUpdated : (state, actions)=>
    {
      console.log(actions.payload)
      state.updated= actions.payload;
    },
    clearUserInformations:(state, actions)=> ({ ...state, ...initialState }),
    }
});

export const { setProfileInfo, isUpdated , clearUserInformations} = userProfileSlice.actions;
export const selectProfileInfo = (state) => state.userInfo;
export default userProfileSlice.reducer


export function getuserPicture(img)
{
  if(img=='' || img ==null)return defaultAvatar;
  else return `http://localhost:8080/upload/profilePictures/${img}`;
   
}