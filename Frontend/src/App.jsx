import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./components/RootLayout";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentDashboard from "./components/StudentDashboard";
import Companies from "./components/Companies";
import Applications from "./components/Applications";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboardPage from "./components/admin/Dashboard";
import AdminCompaniesPage from "./components/admin/Companies";
import AdminStudentsPage from "./components/admin/Students";
import AdminApplicationsPage from "./components/admin/Applications";
import Profile from "./components/Profile";
import Notifications from "./components/Notifications";
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
  path: "profile",
  element: (
    <ProtectedRoute allowedRole="student">
      <Profile />
    </ProtectedRoute>
  )
},
{
  path: "notifications",
  element: (
    <ProtectedRoute allowedRole="student">
      <Notifications />
    </ProtectedRoute>
  )
},
{
  path: "admin/dashboard",
  element: (
    <ProtectedRoute allowedRole="admin">
      <AdminDashboardPage />
    </ProtectedRoute>
  )
},
{
  path: "admin/companies",
  element: (
    <ProtectedRoute allowedRole="admin">
      <AdminCompaniesPage />
    </ProtectedRoute>
  )
},
{
  path: "admin/students",
  element: (
    <ProtectedRoute allowedRole="admin">
      <AdminStudentsPage />
    </ProtectedRoute>
  )
},
{
  path: "admin/applications",
  element: (
    <ProtectedRoute allowedRole="admin">
      <AdminApplicationsPage />
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