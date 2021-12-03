import apiBackEnd from "./api.Backend";
import {URL_BACK_ADD_ORDER} from "../../shared/constants/urls/urlBackEnd";

export function addOrder(list){
    return apiBackEnd.post(URL_BACK_ADD_ORDER,list)
}