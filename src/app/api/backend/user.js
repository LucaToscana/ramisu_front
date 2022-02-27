import apiBackEnd from "./api.BackendWithToken";
import apiBackEndNoToken from "./api.Backend";
import {
        URL_BACK_PROFILE, 
        URL_BACK_UPLOAD_PICTURE, 
        URL_BACK_REMOVE_PICTURE , 
        URL_BACK_CONTACT_US, 
        URL_BACK_UPDATE_PSW,
        URL_BACK_USER_PASSWORD_REQUEST,
        URL_BACK_USER_PWS_TOKEN_VALIDITY,
        URL_BACK_ADD_FAV,
        URL_BACK_GET_FAV,
        URL_BACK_RM_FAV
    } from "../../shared/constants/urls/urlBackEnd";

export function getProfile() {
    return apiBackEnd.get(URL_BACK_PROFILE)
}


export function updateProfile(values)
{
    return apiBackEnd.put(URL_BACK_PROFILE, values);
}

export function uploadPicture(data)
{
    return apiBackEnd.post(URL_BACK_UPLOAD_PICTURE, data , {
        headers: {
        'Content-Type': 'multipart/form-data'
        }});
}


export function removePicture()
{
    return apiBackEnd.put(URL_BACK_REMOVE_PICTURE);
}

export function contactUs(values)
{
    return apiBackEndNoToken.post(URL_BACK_CONTACT_US , values);
}

export function updatePassword(values)
{
    return  apiBackEnd.put(URL_BACK_UPDATE_PSW, values);
}


/*
*       Authenticated User send request for changing password
*/
export function requestChangePSW()
{
    return apiBackEnd.get(URL_BACK_USER_PASSWORD_REQUEST)
}

/**
 *      Valid request password change
 * 
 */
 export function requestValidChangePSW(key)
 {
     const url = URL_BACK_USER_PWS_TOKEN_VALIDITY+key;
     return apiBackEnd.get(url)
 }

/**
*  
**/

export function addFavorite(id_product) {
    return apiBackEnd.post(URL_BACK_ADD_FAV ,{id:id_product});
}
 
export function getFavorites()
{
    return apiBackEnd.get(URL_BACK_GET_FAV);
}

export function removeFavorite(id_product)
{
    return apiBackEnd.delete(URL_BACK_RM_FAV, {id:id_product});
}

import {    
            URL_BACK_GET_USERS,
            URL_BACK_GET_USER_BY_ID,
            URL_BACK_UPGRADE_USER
        } 
from   "../../shared/constants/urls/urlBackEnd";

export function getUsers(page, size, sort)
{
    return apiBackEnd.get(`${URL_BACK_GET_USERS}?page=${page}&size=${size}&sort=${sort.by},${sort.direction}`)
}


export function getUserAccount(userID)
{
    return apiBackEnd.get(`${URL_BACK_GET_USER_BY_ID}${userID}`)
}

export function changeUserRoles(params)
{
    return  apiBackEnd.put(URL_BACK_UPGRADE_USER, params)
}

    

    