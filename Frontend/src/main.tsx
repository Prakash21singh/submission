import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/shared/Home.tsx";
import CourseList from "./Components/CourseList.tsx";
import CourseDetail from "./Components/CourseDetail.tsx";
import Login from "./Components/Login.tsx";
import Signup from "./Components/Signup.tsx";
import Dashboard from "./Components/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/courses",
        element: <CourseList />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/courses/:courseId",
        element: <CourseDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
