import apiBackEnd from "./api.BackendWithToken";
import {URL_BACK_ADD_ORDER, URL_BACK_GET_ORDERS, URL_BACK_GET_ORDERS_DETAILS} from "../../shared/constants/urls/urlBackEnd";

export function addOrder(list){
    return apiBackEnd.post(URL_BACK_ADD_ORDER,list)
}

export const getOrders = () => {
    return apiBackEnd.get(URL_BACK_GET_ORDERS)
}

export const getOrdersDetails = () => {
    return apiBackEnd.get(URL_BACK_GET_ORDERS_DETAILS)
}