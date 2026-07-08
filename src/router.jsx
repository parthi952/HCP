import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./Root/RootLayout";
import { Home } from "./Home";
import { AIChatBot } from "./Page/AIChatBot";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            }
        ]
    },
]);