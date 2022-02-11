import apiBackEnd from "./api.BackendWithToken";
import {URL_BACK_ADD_ORDER, URL_BACK_GET_ORDERS, URL_BACK_GET_ORDER_DETAILS, URL_PAY_ORDER} from "../../shared/constants/urls/urlBackEnd";
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
   
    return apiBackEnd.get(URL_BACK_GET_ORDERS, (req, res) => {
        req.set('Access-Control-Allow-Origin', '*')
        res.set('Access-Control-Allow-Origin', '*');
        res.send({ "msg": "This has CORS enabled 🎈" })
})}

export const getOrdersDetails = (id) => {
    return apiBackEnd.get(URL_BACK_GET_ORDERS + `/${id}`)
}

export const getOrderDetailsWithListProduct = (id) => {
    return apiBackEnd.get(URL_BACK_GET_ORDER_DETAILS + `${id}`)
}


