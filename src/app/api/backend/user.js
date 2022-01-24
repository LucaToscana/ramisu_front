import apiBackEnd from "./api.BackendWithToken";
import {URL_BACK_PROFILE} from "../../shared/constants/urls/urlBackEnd";

export function getProfile() {
    return apiBackEnd.get(URL_BACK_PROFILE)
}


export function updateProfile(values)
{
    return apiBackEnd.put(URL_BACK_PROFILE, values);
}


