const NEXT_PUBLIC_BASE_URL_SERVICE_AUTH = process.env.NEXT_PUBLIC_BASE_URL_API;

const ROUTES_API = {
  AUTH:{
    LOGIN: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/login`,
    LOGOUT: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/logout`,
    REGISTER: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/register`,
    GET_USER: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/user`
  },
  BOOK:{
    CATALOG: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/book/catalog`,
    MY_BOOKS: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/book/my_books`,
    GET_BOOK: (id: string) => `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/book/get_book/${id}`,
    UPDATE: (id: string) => `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/book/edit_book/${id}`,
    DELETE: (id: string) => `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/book/delete_book/${id}`,
    ADD: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/objective-2/book/add_book`,
  }
} as const;

export default ROUTES_API;