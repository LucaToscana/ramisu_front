import apiBackEnd from "./api.BackendWithToken";
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
    return apiBackEnd.post(URL_BACK_CONTACT_US , values);
}


