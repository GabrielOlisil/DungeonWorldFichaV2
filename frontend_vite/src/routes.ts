import { createBrowserRouter } from "react-router-dom";
import _Home from "./pages/Layout";
import Home from "./pages/Home";
import HomeLayout from "./pages/Layout";
import Novo from "./pages/personagens/novo";

export default createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            { path: "/", Component: Home },
            { path: "/personagens/novo", Component: Novo }
        ]
    }
])