
import apiBackEnd from './api.Backend';
import { URL_BACK_AUTHENTICATE, URL_BACK_RESET_PASSWORD_START, URL_BACK_RESET_PASSWORD_END } from '../../shared/constants/urls/urlBackEnd';

export function authenticate(values) {
    return apiBackEnd.post(URL_BACK_AUTHENTICATE, values)
}

// The user must enter their email address to start the process of resetting their password.
export function resetPasswordStart(values) {
    return apiBackEnd.post(URL_BACK_RESET_PASSWORD_START, values.email, { headers: { "Content-Type": "application/json" } })
}

// The user has entered a new password. The function will retrieve this new password and the reset token to validate the process.
export function resetPasswordEnd(values) {
    return apiBackEnd.post(URL_BACK_RESET_PASSWORD_END, values)
}