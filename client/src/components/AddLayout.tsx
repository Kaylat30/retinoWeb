
import { NavLink ,Outlet } from "react-router-dom"
export default function AddLayout()
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
            to="checkupform"
            end
            style ={({isActive})=> isActive ? activestyle : undefined}
            >CheckUp
            </NavLink>
            <NavLink
            to="eyescreeningform"
            end
            style ={({isActive})=> isActive ? activestyle : undefined}
            >Eye Screening
            </NavLink>
        </nav> 
            <Outlet />
        </>
    )
}