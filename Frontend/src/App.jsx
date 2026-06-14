import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./components/RootLayout";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Companies from "./components/Companies";
import Applications from "./components/Applications";
import AdminApplications from "./components/AdminApplications";
import ProtectedRoute from "./components/ProtectedRoute";
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
  element: (
    <ProtectedRoute allowedRole="student">
      <StudentDashboard />
    </ProtectedRoute>
  )
},

        {
  path: "admin-dashboard",
  element: (
    <ProtectedRoute allowedRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  )
},
       {
  path: "companies",
  element: (
    <ProtectedRoute allowedRole="student">
      <Companies />
    </ProtectedRoute>
  )
},
 {
  path: "applications",
  element: (
    <ProtectedRoute allowedRole="student">
      <Applications />
    </ProtectedRoute>
  )
},
{
  path: "admin-applications",
  element: (
    <ProtectedRoute allowedRole="admin">
      <AdminApplications />
    </ProtectedRoute>
  )
}
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