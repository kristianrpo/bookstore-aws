const ROUTES = {
    HOME : "/",
    LOGIN : "/login",
    REGISTER : "/register",
    CATALOG : "/catalog",
    MY_BOOKS : "/my_books",
    ADD_BOOK : "/add_book",
    EDIT_BOOK : "/edit_book",
    BOOK : (id: string) => `/book/${id}`,
    ADMIN_USERS : "/admin/users",
  } as const;
  
  export default ROUTES;