import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./components/RootLayout";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Companies from "./components/Companies";
import Applications from "./components/Applications";
import AdminApplications from "./components/AdminApplications";
import { Toaster } from "react-hot-toast";

function App() {

  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,

      children: [

        {
          index: true,
          element: <Login />
        },

        {
          path: "register",
          element: <Register />
        },

        {
          path: "student-dashboard",
          element: <StudentDashboard />
        },

        {
          path: "admin-dashboard",
          element: <AdminDashboard />
        },
        {
          path: "/companies",
          element: <Companies />,
        },
        {
         path: "/applications",
         element: <Applications />,
         },
        {
        path:"/admin-applications",
        element:<AdminApplications />,
        },
      ]
    }
  ]);

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <RouterProvider router={routerObj} />
    </div>
  );
}

export default App;