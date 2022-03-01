import apiBackEnd from "./api.BackendWithToken"
import { URL_FILTER_CATEGORIES, URL_FILTER_UNIVERSES, URL_FILTER_TAGS } from "../../shared/constants/urls/urlBackEnd";


/**
 * Instance axios to get the list of categories, universes, tags
 * 
 * @author Jeremy Dejonghe
 */
export const getAllCategories = () => {

    return apiBackEnd.get(URL_FILTER_CATEGORIES);
};

export const getAllUniverses = () => {

    return apiBackEnd.get(URL_FILTER_UNIVERSES);
};

export const getAllTags = () => {

    return apiBackEnd.get(URL_FILTER_TAGS);
};