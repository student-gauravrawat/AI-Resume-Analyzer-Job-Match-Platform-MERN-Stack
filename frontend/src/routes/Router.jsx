import {createBrowserRouter} from "react-router-dom"
import {Register, EmailVerify, Login, MyResume, JobMatch, History, ChangePassword, AnalyzeResult, Profile} from "../allComponents/index"
import MainLayout from "./MainLayout";
import PublicRoute from "./PublicRoute"
import ProtectedRoute from "./ProtectedRoute";


const router = createBrowserRouter([
    {
       path: "/login",
       element: <PublicRoute>
                  <Login/>
                </PublicRoute>
    }, 
    {
        path:"/register",
        element: <PublicRoute>
                     <Register/>
                 </PublicRoute>
    },
    {
        path: "/email-verify",
        element: <PublicRoute>
                     <EmailVerify/>
                 </PublicRoute>
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainLayout/>
            </ProtectedRoute>
        ),
        children: [
            {index: true, element: <MyResume/>},
            {path: "/jobmatch", element: <JobMatch/>},
            {path: "/profile", element: <Profile/>},
            {path: "/history", element: <History/>},
            {path: "/analyzeresult/:id", element: <AnalyzeResult/>},
            {path: "/changepassword", element: <ChangePassword/>},
        ]
    }
  
])

export default router;

