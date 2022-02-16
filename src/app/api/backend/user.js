import apiBackEnd from "./api.BackendWithToken";
import apiBackEndNoToken from "./api.Backend";
import {URL_BACK_PROFILE, URL_BACK_UPLOAD_PICTURE, URL_BACK_REMOVE_PICTURE , URL_BACK_CONTACT_US} from "../../shared/constants/urls/urlBackEnd";

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

import {    
   
        URL_BACK_GET_USERS,
        URL_BACK_GET_USER_BY_ID,
        URL_BACK_UPGRADE_USER
    } 
from   "../../shared/constants/urls/urlBackEnd";
    export function getUsers(page, size, sort)
    {
        return apiBackEnd.get(`${URL_BACK_GET_USERS}?page=${page}&size=${size}&sort=${sort.by},${sort.direction}`)
        // return apiBackEnd.get(`${URL_BACK_GET_USERS}?page=${page}&size=${size}&sort=id,ASC`)
    }


    export function getUserAccount(userID)
    {
        return apiBackEnd.get(`${URL_BACK_GET_USER_BY_ID}${userID}`)
    }

    export function changeUserRoles(params)
    {
        return  apiBackEnd.put(URL_BACK_UPGRADE_USER, params)
    }

    

    