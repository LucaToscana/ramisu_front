import apiBackEnd from './api.Backend';
import { URL_BACK_PRODUCTS } from '../../shared/constants/urls/urlBackEnd';
/**
 * Instance axios to get the list of products
 * 
 * @author Jeremy Dejonghe
 */
export const getProducts = () => {

    return apiBackEnd.get(URL_BACK_PRODUCTS);
};


