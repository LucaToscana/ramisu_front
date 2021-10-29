import apiBackEnd from "./api.Backend";
import {URL_BACK_PRODUCT_DETAIL} from "../../shared/constants/urls/urlBackEnd";

/**
 * Instance axios to the BACKEND
 *
 *@author Brahim TALLA
 */
export function productDetail() {
    return apiBackEnd.get(URL_BACK_PRODUCT_DETAIL)
}