import apiBackEnd from "./api.BackendWithToken";
import {URL_BACK_ADD_ORDER, URL_BACK_GET_ORDERS, URL_BACK_GET_ORDER_DETAILS, URL_PAY_ORDER} from "../../shared/constants/urls/urlBackEnd";
import axios from "axios";

export function addOrder(list){
    return apiBackEnd.post(URL_BACK_ADD_ORDER,list)
}

export const getOrders = () => {
    return apiBackEnd.get(URL_BACK_GET_ORDERS)
}

export const getOrdersDetails = (id) => {
    return apiBackEnd.get(URL_BACK_GET_ORDERS + `/${id}`)
}

export const getOrderDetailsWithListProduct = (id) => {
    return apiBackEnd.get(URL_BACK_GET_ORDER_DETAILS + `${id}`)
}


