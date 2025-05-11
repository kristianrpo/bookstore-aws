const ROUTES = {
    HOME : "/objective-3",
    LOGIN : "/login",
    REGISTER : "/register",
    CATALOG : "/book/catalog",
    MY_BOOKS : "/book/my_books",
    ADD_BOOK : "/book/add_book",
    EDIT_BOOK : "/book/edit_book",
    ADMIN_USERS : "/admin/users",
    STATIC_SERVER: process.env.BASE_URL_STATIC_SERVER
  } as const;
  
  export default ROUTES;