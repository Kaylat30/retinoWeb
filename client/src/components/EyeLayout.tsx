
import { NavLink ,Outlet } from "react-router-dom"
export default function EyeLayout()
{
    const activestyle = {
        fontWeight:"bold",
        textDecoration: "underline",
        color: "#161616"
    }
    return(
        <>
        <nav className="flex mb-10">
            <NavLink
            to="."
            end
            style ={({isActive})=> isActive ? activestyle : undefined}
            >Appointment
            </NavLink>
            <NavLink
            to="checkup"
            end
            style ={({isActive})=> isActive ? activestyle : undefined}
            >CheckUp
            </NavLink>
            <NavLink
            to="eyescreening"
            end
            style ={({isActive})=> isActive ? activestyle : undefined}
            >Eye Screening
            </NavLink>
        </nav> 
            <Outlet />
        </>
    )
}