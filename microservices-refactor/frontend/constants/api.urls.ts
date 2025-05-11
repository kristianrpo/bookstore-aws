const BASE_URL_SERVICE_AUTH = process.env.BASE_URL_API_AUTH;
const BASE_URL_SERVICE_BOOK = process.env.BASE_URL_API_BOOK;

const ROUTES_API = {
  AUTH:{
    LOGIN: `${BASE_URL_SERVICE_AUTH}/login`,
    LOGOUT: `${BASE_URL_SERVICE_AUTH}/logout`,
    REGISTER: `${BASE_URL_SERVICE_AUTH}/register`,
    GET_USER: `${BASE_URL_SERVICE_AUTH}/user`
  },
  BOOK:{
    CATALOG: `${BASE_URL_SERVICE_BOOK}/book/catalog`,
    MY_BOOKS: `${BASE_URL_SERVICE_BOOK}/book/my_books`,
    BOOK: (id: string) => `${BASE_URL_SERVICE_BOOK}/book/${id}`,
    EDIT_BOOK: (id: string) => `${BASE_URL_SERVICE_BOOK}/book/edit_book/${id}`,
    DELETE_BOOK: (id: string) => `${BASE_URL_SERVICE_BOOK}/book/delete_book/${id}`,
    ADD: `${BASE_URL_SERVICE_BOOK}/book/add_book`,
    SERVE_IMAGE: (filename: string) => `${BASE_URL_SERVICE_BOOK}/book/image/${filename}`,
  }
} as const;

export default ROUTES_API;