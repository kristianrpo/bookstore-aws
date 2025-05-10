const NEXT_PUBLIC_BASE_URL_SERVICE_AUTH = process.env.NEXT_PUBLIC_BASE_URL_API_AUTH;
const NEXT_PUBLIC_BASE_URL_SERVICE_BOOK = process.env.NEXT_PUBLIC_BASE_URL_API_BOOK;
const NEXT_PUBLIC_BASE_URL_SERVICE_ORDER = process.env.NEXT_PUBLIC_BASE_URL_API_ORDER;

const ROUTES_API = {
  AUTH:{
    LOGIN: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/login`,
    LOGOUT: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/logout`,
    REGISTER: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/register`,
    GET_USER: `${NEXT_PUBLIC_BASE_URL_SERVICE_AUTH}/user`
  },
  BOOK:{
    CATALOG: `${NEXT_PUBLIC_BASE_URL_SERVICE_BOOK}/book/catalog`,
    MY_BOOKS: `${NEXT_PUBLIC_BASE_URL_SERVICE_BOOK}/book/my_books`,
    BOOK: (id: string) => `${NEXT_PUBLIC_BASE_URL_SERVICE_BOOK}/book/${id}`,
    EDIT_BOOK: (id: string) => `${NEXT_PUBLIC_BASE_URL_SERVICE_BOOK}/book/edit_book/${id}`,
    DELETE_BOOK: (id: string) => `${NEXT_PUBLIC_BASE_URL_SERVICE_BOOK}/book/delete_book/${id}`,
    ADD: `${NEXT_PUBLIC_BASE_URL_SERVICE_BOOK}/book/add_book`,
    SERVE_IMAGE: (filename: string) => `${NEXT_PUBLIC_BASE_URL_SERVICE_BOOK}/book/image/${filename}`,
  },
  ORDER:{
    PAYMENT: (purchase_id: string) => `${NEXT_PUBLIC_BASE_URL_SERVICE_ORDER}/payment/${purchase_id}`,
    PURCHASE: (book_id: string) => `${NEXT_PUBLIC_BASE_URL_SERVICE_ORDER}/purchase/buy/${book_id}`,
    DELIVERY: (purchase_id: string) => `${NEXT_PUBLIC_BASE_URL_SERVICE_ORDER}/delivery/select/${purchase_id}`,
    MY_DELIVERIES: `${NEXT_PUBLIC_BASE_URL_SERVICE_ORDER}/delivery/my_deliveries`,
    CREATE_DELIVERY: `${NEXT_PUBLIC_BASE_URL_SERVICE_ORDER}/delivery/create`,
  }
} as const;

export default ROUTES_API;