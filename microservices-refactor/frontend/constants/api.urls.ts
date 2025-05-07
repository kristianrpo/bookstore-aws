const NEXT_PUBLIC_BASE_URL_SERVICE_AUTH = process.env.NEXT_PUBLIC_BASE_URL_API;

const ROUTES_API = {
  AUTH:{
    LOGIN: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/login`,
    LOGOUT: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/logout`,
    REGISTER: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/register`,
    GET_USER: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/user`
  },
  BOOK:{
    GET_ALL: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/books`,
    GET_BY_SELLER_ID: (id: string) => `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/books/${id}`,
    ADD: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/books`,
    UPDATE: (id: string) => `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/books/${id}`,
    DELETE: (id: string) => `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/books/${id}`,
  }
} as const;

export default ROUTES_API;