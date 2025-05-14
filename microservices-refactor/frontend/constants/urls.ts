const ROUTES = {
    HOME : "/objective-3",
    LOGIN : "/objective-3/login",
    REGISTER : "/objective-3/register",
    CATALOG : "/objective-3/book/catalog",
    MY_BOOKS : "/objective-3/book/my_books",
    ADD_BOOK : "/objective-3/book/add_book",
    EDIT_BOOK : "/objective-3/book/edit_book",
    ADMIN_USERS : "/objective-3/admin/users",
    PAYMENT : "/objective-3/payment",
    PURCHASE : "/objective-3/purchase",
    DELIVERY : "/objective-3/delivery",
    MY_DELIVERIES : "/objective-3/delivery/my_deliveries",
    CREATE_DELIVERY : "/objective-3/delivery/create",
    STATIC_SERVER: process.env.BASE_URL_STATIC_SERVER
  } as const;
  
  export default ROUTES;