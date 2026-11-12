export const APP_ROUTES = {
  HOME: "/",
  HOTELS: {
    ROOT: "/hotels",
    DETAIL: (slug) => `/hotels/${slug}`,
    SEARCH: "/hotels/search",
  },
  BOOKINGS: {
    CHECKOUT: "/checkout",
    CONFIRMATION: "/bookings/confirmation",
    MANAGE: "/bookings/manage",
  },
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
  },
  USER: {
    DASHBOARD: "/user",
    BOOKINGS: "/user/bookings",
    WISHLIST: "/user/wishlist",
    PROFILE: "/user/profile",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    HOTELS: "/admin/hotels",
    BOOKINGS: "/admin/bookings",
    ANALYTICS: "/admin/analytics",
  },
};

