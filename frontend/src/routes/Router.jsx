import {createBrowserRouter} from "react-router-dom"
import {MyResume, JobMatch, History, ChangePassword, AnalyzeResult, Profile} from "../pages/index"
import MainLayout from "./MainLayout";
import PublicRoute from "./PublicRoute"
import ProtectedRoute from "./ProtectedRoute";
import {LandingPage} from "../pages/index.js"


const router = createBrowserRouter([ 
    {
       path: "/mainpage",
       element:   
        <PublicRoute>
            <LandingPage/>
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

