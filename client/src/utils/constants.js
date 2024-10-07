export const HOST = import.meta.env.VITE_SERVER_URL

export const AUTH_ROUTE = "api/auth"
export const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`
export const GET_USERINFO = `${AUTH_ROUTE}/userInfo`
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTE}/update-profile`
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTE}/add-profile-image`
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTE}/remove-profile-image`
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`

const CONTACTS_ROUTE = "api/contacts"
export const SEARCH_CONTACTS_ROUTES = `${AUTH_ROUTE}/search`