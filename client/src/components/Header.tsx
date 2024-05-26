import { useState,useEffect, } from 'react';
import { Link, NavLink ,useLocation} from 'react-router-dom';
import image from '../assets/icon.png';
import {IoNotifications,IoPersonCircleOutline } from "react-icons/io5";
import { logoutUser } from '../api';
import { toast } from "react-toastify"
import Cookies from "js-cookie"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
//  const [count, setCount] = useState(0);
 // const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  //const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page when the location changes
    window.scrollTo(0, 0);
  }, [location.pathname]);
 
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const cartData = await getCart();
  //       setCartItems(cartData);
  //       cartData.length == undefined ? setCount(0) : setCount(cartData.length)
  //     } catch (error) {
  //       console.error('Error fetching cart items:', error);
  //     }
  //   };

  //   fetchCart(); 

    
  // }, [cartItems]);


  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
}

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Close the account slider when opening the menu
    setShowDiv(false);
  };

  // Close the menu when a navigation occurs
  useEffect(() => {
    setMenuOpen(false);
    setShowDiv(false);
  }, [location.pathname]);
 
  const [showDiv, setShowDiv] = useState(false);

  // Access the firstname from the firstname cookie
  const firstnameCookie = Cookies.get('firstname');
  const firstnameData = firstnameCookie ? JSON.parse(firstnameCookie) : {};
  const isAuthenticated = !!firstnameData.firstname;
  const username = firstnameData.firstname || "";

  const toggleDiv = () => {
    setShowDiv(!showDiv);
    // Close the menu when opening the account slider
    setMenuOpen(false);
  };



  const handleLogout = async () => {
    try {
      // Call the logout API function
      await logoutUser();
  
      // Remove the 'firstname' cookie
      Cookies.remove('firstname');
  
      toast.success(" logged out successfully",{
        position: "bottom-left"
      })
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="flex flex-col justify-center mx-auto px-4 pb-4 fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className='flex items-center justify-between'>
          <Link to="/" className="pt-2 flex items-center">
            <img className="h-16" src={image}  alt="retino Logo" />
            <h2 className="font-bold text-xl">Retino</h2>
          </Link>

          {/* search section  */}
          <div className='hidden sm:flex  '>
          <div className={`lg:flex space-x-6 hidden `}>

            <NavLink 
            to="/"           
            className="hover:text-brightGreen"
            style={({isActive}) => isActive ? activeStyles : undefined}>
              Home
            </NavLink>

            <NavLink 
            to="insight"           
            className="hover:text-brightGreen"
            style={({isActive}) => isActive ? activeStyles : undefined}>
              Insights
            </NavLink>

            <NavLink 
            to="eye"           
            className="hover:text-brightGreen"
            style={({isActive}) => isActive ? activeStyles : undefined}>
              Eye
            </NavLink>

            <NavLink 
            to="nutrition"           
            className="hover:text-brightGreen"
            style={({isActive}) => isActive ? activeStyles : undefined}>
              Nutrition
            </NavLink>

            <NavLink 
            to="add"           
            className="hover:text-brightGreen"
            style={({isActive}) => isActive ? activeStyles : undefined}>
              Add
            </NavLink>

            {/* This link is hidden on screens smaller than LG */}           

            <NavLink 
            to="education" 
            className="hover:text-brightGreen"
            style={({isActive}) => isActive ? activeStyles : undefined}>
              Education
            </NavLink>

            <NavLink 
            to="blog" 
            className="hover:text-brightGreen"
            style={({isActive}) => isActive ? activeStyles : undefined}>
              Blogs
            </NavLink>

            </div>

            
          </div>
          
          <div className='flex space-x-6'>          
          <NavLink
                  to="cart"
                  className="hover:text-brightGreen text-2xl relative"
                  style={({isActive}) => isActive ? activeStyles : undefined}
                >
                  <IoNotifications />                  
                    <span className="absolute flex justify-center -top-1 -right-1 bg-red-600 text-xs text-white  h-4 w-4 rounded-full">
                      {/* {count} */}
                      3
                    </span>
                  
                </NavLink>

                <button 
                className="hover:text-brightGreen text-2xl"
                onClick={toggleDiv}>
                  <IoPersonCircleOutline/>
                </button>
            <button
              id="menu-btn"
              className={`hamburger lg:hidden focus:outline-none ${
                menuOpen ? 'open' : ''
              }`}
              onClick={toggleMenu}
            >
              <span className="hamburger-top"></span>
              <span className="hamburger-middle"></span>
              <span className="hamburger-bottom"></span>
            </button>
          </div>
        
              
      </div>

        {/* Account slider section */}
        {showDiv && (
          <div className="fixed right-5 top-20 h-32 shadow-2xl w-1/3 bg-white overflow-hidden transition-all duration-1000">
            <div className="p-4 space-y-4">
              
              {isAuthenticated ?
              ( <>
                <h1>hello, {username}</h1>
                <button
                  
                  onClick={handleLogout}
                  className="flex justify-center p-3 px-6 w-full md:mt-4 text-white font-bold bg-brightBlue rounded-lg baseline hover:bg-brightBlueLight"
                >
                  Logout
                </button>
                </>):
                ( <>
                  <h1>Welcome </h1>
                  <Link
                  to="login"
                  className="flex justify-center p-3 px-6 w-full md:mt-4 text-white font-bold bg-brightBlue rounded-lg baseline hover:bg-brightBlueLight"
                >
                  Login
                </Link>
                </>)
                }
              
            </div>
          </div>
        )}

        {/* hamburg menu div */}      
        <div
          id="menu"
          className={`lg:hidden  ${
            menuOpen ? 'flex flex-col' : 'hidden'
          } items-center self-end py-8 mt-10 space-y-6 font-bold bg-white xsm:w-64 xsm:self-center left-6 right-6 drop-shadow-md`}
        >
          
          <Link to="/">Home</Link>
          <Link to="insight">Insights</Link>
          <Link to="eye">Eye</Link>
          <Link to="nutrition">Nutrition</Link> 
          <Link to="add">Add</Link>
          <Link to="education">Education</Link>
          <Link to="blog">Blogs</Link>        
                  
        </div>
    </nav>
  );
}
