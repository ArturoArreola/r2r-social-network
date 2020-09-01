import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";

export default [
    {
        path: "/",
        exact: true,
        page: HomePage
    },
    {
        path: "*",
        page: ErrorPage
    }
]