const NEXT_PUBLIC_BASE_URL_SERVICE_AUTH = process.env.NEXT_PUBLIC_BASE_URL_API;

const ROUTES_API = {
  AUTH:{
    LOGIN: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/login`,
    LOGOUT: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/logout`,
    REGISTER: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/register`,
    GET_USER: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/user`,
  }
} as const;

export default ROUTES_API;