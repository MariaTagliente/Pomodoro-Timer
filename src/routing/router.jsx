import { createBrowserRouter } from "react-router";
import Layout from "../components/LayoutComponents/Layout";
import Homepage from "../views/Homepage";
import LayoutSettings from "../components/LayoutComponents/LayoutSettings";
import SettingsPag from "../views/SettingsPage";
import SettingsPage from "../views/SettingsPage";

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
    },

    {
        path: '/',
        Component: LayoutSettings,
        children: [
            {
                path: '/settings',
                Component: SettingsPage
            }
        ]
    }
]);

export default router;