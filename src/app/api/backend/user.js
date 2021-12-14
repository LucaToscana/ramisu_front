import apiBackEnd from "./api.BackendWithToken";
import {URL_BACK_PROFILE} from "../../shared/constants/urls/urlBackEnd";

export function getProfile() {
    return apiBackEnd.get(URL_BACK_PROFILE)
}