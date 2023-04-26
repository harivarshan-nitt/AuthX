import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Profile from './routes/Profile';
import Login from './routes/Login';
import reportWebVitals from './reportWebVitals';
import Register from './routes/Register';
import Logout from './routes/Logout';
import Authorize from './routes/Authorize';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Profile />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/logout",
    element: <Logout />
  },
  {
    path: "/authorize",
    element: <Authorize />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
