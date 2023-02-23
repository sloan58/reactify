import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import { Sanctum } from "react-sanctum";

const sanctumConfig = {
    apiUrl: "http://localhost:8000",
    csrfCookieRoute: "sanctum/csrf-cookie",
    signInRoute: "login",
    signOutRoute: "logout",
    userObjectRoute: "api/user",
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Sanctum config={sanctumConfig}>
            <App />
          </Sanctum>
      </BrowserRouter>
  </React.StrictMode>,
)
