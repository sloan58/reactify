import { useSanctum } from "react-sanctum";
import Login from "./pages/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
    const authRouter = createBrowserRouter([
        {
            path: "/",
            element: <Dashboard />,
        },
    ]);

    const guestRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
    ]);

    const { authenticated } = useSanctum();
    return authenticated == null ? (
        ""
    ) : (
        <RouterProvider router={authenticated ? authRouter : guestRouter} />
    );
}

export default App;
