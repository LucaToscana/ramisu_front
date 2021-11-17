import apiBackEnd from "./api.Backend";
import {URL_BACK_PRODUCT_DETAIL, URL_BACK_PRODUCTS, URL_BACK_TOTAL_PRODUCTS, URL_BACK_GET_NUMBER_OF_PRODUCTS_BY_FIELD} from "../../shared/constants/urls/urlBackEnd";

/**
 * Instance axios to the BACKEND
 *
 *@author Brahim TALLA
 */
export function productDetail(id) {
    return apiBackEnd.get(URL_BACK_PRODUCT_DETAIL+`${id}`)
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




/**
 * Get X products depending on a field (random, promotion, top sale)
 * 
 * @param {*} field the field used for searching
 * @param {*} numberOfResult the number of products wanted
 * @returns a page containing the number of products wanted
 * @author Cecile
 */
export function getNumberOfProductsByField(field, numberOfResult) {
    return apiBackEnd.get(`${URL_BACK_GET_NUMBER_OF_PRODUCTS_BY_FIELD}${field}/${numberOfResult}`)
}