import { createBrowserRouter } from "react-router-dom";
import _Home from "./pages/_Home";
import App from "./pages/App";
import HomeLayout from "./pages/_Home";

export default createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            { path: "/", Component: App }
        ]
    }
])