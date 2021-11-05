import apiBackEnd from "./api.Backend";
import {URL_BACK_PRODUCT_DETAIL, URL_BACK_PRODUCTS, URL_BACK_TOTAL_PRODUCTS} from "../../shared/constants/urls/urlBackEnd";

/**
 * Instance axios to the BACKEND
 *
 *@author Brahim TALLA
 */
export function productDetail() {
    return apiBackEnd.get(URL_BACK_PRODUCT_DETAIL)
}

/**
 * Instance axios to get the list of products
 * 
 * @author Jeremy Dejonghe
 */
export const getProducts = (page) => {

    return apiBackEnd.get(URL_BACK_PRODUCTS + "?page=" + page + "&size=10");
};

export const getTotalProducts = () => {

    return apiBackEnd.get(URL_BACK_TOTAL_PRODUCTS);
};


