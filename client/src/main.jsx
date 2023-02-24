import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Sanctum } from "react-sanctum";

const sanctumConfig = {
    apiUrl: "http://localhost:8000",
    csrfCookieRoute: "sanctum/csrf-cookie",
    signInRoute: "login",
    signOutRoute: "logout",
    userObjectRoute: "api/user",
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Sanctum config={sanctumConfig}>
            <App />
        </Sanctum>
    </React.StrictMode>
);
