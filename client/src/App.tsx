import { Route, createBrowserRouter, createRoutesFromElements,RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
// import Login , { action as loginAction} from "./pages/Login"
import Login from "./pages/Login"
import Signup  from "./pages/Signup";
import Error from "./components/Error"
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Education from "./pages/Education";
import Nutrition from "./pages/Nutrition";
import Eye from "./pages/Eye";
import Insights from "./pages/Insights";
import AppointmentForm from "./pages/ApppointmentForm";
import CheckupForm from "./pages/CheckupForm";
import AddLayout from "./components/AddLayout";
import Educinfo from "./pages/Educinfo";
import BlogInfo from "./pages/BlogInfo";
import EyescreeningForm from "./pages/EyescreeningForm";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<Error />}>
     <Route index  element={<Home />}/>
     <Route path="insight" element={<Insights />} />
     <Route path="eye" element={<Eye />} />
     <Route path="add" element={<AddLayout />} >
        <Route index element={<AppointmentForm/>}/>
        <Route path="checkupform" element={<CheckupForm />}/>
        <Route path="eyescreeningform" element={<EyescreeningForm />}/> 
     </Route>
    <Route path="nutrition" element={<Nutrition />} />
     <Route path="education" element={<Education />} />
     <Route path="education/:text" element={<Educinfo />}/>
     <Route path="blog" element={<Blog />} />
     <Route path="blog/:id" element={<BlogInfo />} />
     <Route path="signup" element={<Signup />} />
     <Route path="login" element={<Login />} />
  </Route>  
))
function App():JSX.Element{
  

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />      
    </>
  )
}

export default App
