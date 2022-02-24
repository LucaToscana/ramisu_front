import apiBackEnd from "./api.BackendWithToken";
import {URL_BACK_ADD_ORDER, URL_BACK_GET_ORDERS, URL_BACK_GET_ORDER_DETAILS, URL_CUSTOMER_CARDS, URL_NEW_CUSTOMER, URL_NEW_CUSTOMER_AND_PAY, URL_PAY_ONE_TIMES, URL_PAY_ORDER} from "../../shared/constants/urls/urlBackEnd";
import axios from "axios";

export function addOrder(list){
    return apiBackEnd.post(URL_BACK_ADD_ORDER,list)
}

export function addOrderWithAddress(list,address,type,isMain){

    const order = {
        productsOrder:list,
        address:address,
        type:type,
        isMain:isMain
    }
    return apiBackEnd.post(URL_BACK_ADD_ORDER,order)
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
/*credit-card*/ 
export const payOneTimes=(values)=>{
    return apiBackEnd.post(URL_PAY_ONE_TIMES,values)
}
export const newCustomerAndPay=(values)=>{
    return apiBackEnd.post(URL_NEW_CUSTOMER_AND_PAY,values)
}

export const newCustomer=(values)=>{
    return apiBackEnd.post(URL_NEW_CUSTOMER,values)
}


export const allCustomerCards=()=>{
    return apiBackEnd.get(URL_CUSTOMER_CARDS)
}