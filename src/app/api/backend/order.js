import apiBackEnd from "./api.BackendWithToken";
import {URL_BACK_ADD_ORDER} from "../../shared/constants/urls/urlBackEnd";

export function addOrder(list){
    return apiBackEnd.post(URL_BACK_ADD_ORDER,list)
}