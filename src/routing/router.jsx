import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Homepage from "../views/Homepage";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: '/',
                Component: Homepage
            }
        ]
    }
]);

export default router;