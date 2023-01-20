import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import App from "../App";
import CheckAuth from "../utils/CheckAuth";
import Guest from "../utils/Guest";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        //   element: token ? <Home /> : <Navigate to="/login" replace={true}/>,
        element: (
          <CheckAuth>
            <Home />
          </CheckAuth>
        ),
      },
      {
        path: "/login",
        element: (
          <Guest>
            <Login />
          </Guest>
        ),
      },
      {
        path: "/register",
        element: (
          <Guest>
            <Register />
          </Guest>
        ),
      },
    ],
  },
]);
