import apiBackEnd from "./api.BackendWithToken";
import {URL_BACK_PROFILE, URL_BACK_UPLOAD_PICTURE} from "../../shared/constants/urls/urlBackEnd";

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
