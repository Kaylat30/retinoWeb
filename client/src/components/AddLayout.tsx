
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
            >Medication
            </NavLink>
            <NavLink
            to="nutritionform"
            end
            style ={({isActive})=> isActive ? activestyle : undefined}
            >Nutrition
            </NavLink>
        </nav> 
            <Outlet />
        </>
    )
}