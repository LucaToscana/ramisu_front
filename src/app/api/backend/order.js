import apiBackEnd from "./api.BackendWithToken";
import {URL_BACK_ADD_ORDER, URL_BACK_GET_ORDERS} from "../../shared/constants/urls/urlBackEnd";

export function addOrder(list){
    return apiBackEnd.post(URL_BACK_ADD_ORDER,list)
}

export const getOrders = () => {
    return apiBackEnd.get(URL_BACK_GET_ORDERS)
}

export const getOrdersDetails = (id) => {
    return apiBackEnd.get(URL_BACK_GET_ORDERS + `/${id}`)
}