// USER BACK-END URLS
export const URL_BACK_AUTHENTICATE = '/login'
export const URL_BACK_REGISTER = '/public/register'
//export const URL_BACK_AUTHENTICATE = '/authenticate'
export const URL_BACK_PROFILE = '/public/profile'
export const URL_BACK_UPLOAD_PICTURE = '/public/pictureProfile'
export const URL_BACK_REMOVE_PICTURE = '/public/removePictureProfile'
export const URL_BACK_RESET_PASSWORD_START = '/public/passwordresetstart'
export const URL_BACK_CHECK_TOKEN_VALIDITY = '/public/passwordresetcheck'
export const URL_BACK_RESET_PASSWORD_END = '/public/passwordresetend/'
export const URL_BACK_UPDATE_PSW = '/public/changePSW'
export const URL_BACK_USER_PASSWORD_REQUEST = '/public/requestChangePSW'
export const URL_BACK_USER_PWS_TOKEN_VALIDITY = '/public/userPasswordCheck/'

// PRODUCT BACK-END URLS
export const URL_BACK_PRODUCTS = '/public/products'
export const URL_BACK_PRODUCT_DETAIL = `/public/product/`
export const URL_BACK_TOTAL_PRODUCTS = '/public/products/count'
export const URL_BACK_GET_NUMBER_OF_PRODUCTS_BY_FIELD = '/public/products/random/'
export const URL_BACK_PRODUCTS_SEARCH_CRITERIA = '/public/products/search/'
export const URL_BACK_PRODUCT_DETAIL_RELATED =  `/public/productDetails/`

// UNIVERSE BACK-END URLS
export const URL_BACK_UNIVERSE_BY_ID = '/'

// FILTER URLS
export const URL_FILTER_CATEGORIES = '/public/categories'
export const URL_FILTER_UNIVERSES = '/public/universes'
export const URL_FILTER_TAGS = '/public/tags'

//order
export const URL_BACK_ADD_ORDER = 'user/addorder'
export const URL_BACK_GET_ORDERS = '/orders'
export const URL_BACK_GET_ORDER_DETAILS = '/orders/details/'

export const URL_PAY_ORDER = '/payment/charge'

//users
export const URL_BACK_CONTACT_US = '/public/contactus'

//URLs Admin
export const URL_BACK_GET_USERS = '/user/users'
export const URL_BACK_GET_USER_BY_ID = '/user/account/'
export const URL_BACK_UPGRADE_USER = '/user/account/roles/'

//urls Payer
export const URL_PAY_ONE_TIMES ='/payment/one-times-pay'
export const URL_NEW_CUSTOMER_AND_PAY = '/payment/new-customer-and-pay'
export const URL_NEW_CUSTOMER ='/payment/new-customer'
export const URL_CUSTOMER_CARDS ='/payment/customer-cards'
export const URL_DELETE_CARD ='/payment/delete-customer-card'