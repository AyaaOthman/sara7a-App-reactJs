import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import Profile from "./Components/Profile/Profile";
import SendMessage from "./Components/SendMessage/SendMessage";
import { useContext, useEffect } from "react";
import { tokenContext } from "./Context/tokenContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  let queryClient = new QueryClient();

  let { setToken } = useContext(tokenContext);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
    }
  });
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Register />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <QueryClientProvider client={queryClient}>
                <Profile />
              </QueryClientProvider>
            </ProtectedRoute>
          ),
        },
        {
          path: "message/:userId",
          element: <SendMessage />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
