// import { Form, Link, useNavigation, useNavigate, useActionData } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { LoginUser } from '../api';
// import { toast } from "react-toastify";


// export async function action({ request }: { request: Request }) {
//   const formData = await request.formData();
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const pathname = new URL(window.location.href).searchParams.get("redirectTo") || "/";

//   try {
//     // Attempt to log in the user
//     const user = await LoginUser(email, password);
//     if (user) {
//       toast.success("Logged in successfully", {
//         position: "bottom-left",
//       });
//       return { redirect: pathname};
//     } else {
//       return { error: "Invalid email or password" };
//     }
//   } catch (err) {
//     if (err instanceof Error) {
//       return { error: err.message };
//     }
//     return { error: "An error occurred while logging in" };
//   }
// }

// export default function Login() {

//   type ActionData = {
//     redirect?: string; 
//     error?: string;    
//   };
//   const actionData: ActionData = useActionData() || {};
//   const message = new URL(window.location.href).searchParams.get("message");
//   const navigation = useNavigation();
//   const navigate = useNavigate();

   

//   useEffect(() => {
//     if (actionData.redirect) {
//       navigate(actionData.redirect);
//     }
//   }, [actionData, navigate]);

//   const [showPassword, setShowPassword] = useState(false);

//   const handleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <>
//       {/* form section */}
//       <div className='flex items-center flex-col my-10 space-y-3 lg:ml-28 lg:mr-28 xsm:ml-7 xsm:mr-7'>
//         <h1 className="font-bold text-xl">Login</h1>
//         {message && <h3 className="text-red-500 font-bold">{message}</h3>}
//         {actionData.error && <h3 className="text-red-500">{actionData.error}</h3>}
//         <Form className='flex flex-col items-center space-y-7 shadow-md p-10' replace method="post">
//           <input type='text' placeholder='email' name="email" className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' />
//           <input type={showPassword ? "text" : "password"} name="password" placeholder='Password' className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' />
//           <label className="cursor-pointer"><input type="checkbox" className="form-checkbox h-5 w-5" checked={showPassword} onChange={handleShowPassword} /> showPassword</label>
//           <button
//             disabled={navigation.state === "submitting"}
//             type='submit'
//             className="md:p-4 xsm:p-2 xsm:px-4 md:px-9 font-bold text-white bg-brightBlue rounded-md baseline hover:shadow-2xl"
//           >
//             {navigation.state === "submitting"
//               ? "Signing in..."
//               : "SIGN IN"
//             }
//           </button>
//         </Form>
//         <div>Do not have an account? <Link className="text-brightBlue" to='/signup'>Sign up</Link></div>
//       </div>
//     </>
//   );
// }




import { Form, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store'
//import { useDispatch,useSelector } from 'react-redux';
import { loginUser, selectStatus, selectError } from '../slice/userSlice';
import { toast } from 'react-toastify';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('Logged in successfully', {
        position: 'bottom-left',
      });
      navigate('/');
    } else if (status === 'failed') {
      toast.error(error || 'An error occurred while logging in', {
        position: 'bottom-left',
      });
    }
  }, [status, error, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    dispatch(loginUser({ email, password }))
      
  };

  return (
    <>
      {/* form section */}
      <div className='flex items-center flex-col my-10 space-y-3 lg:ml-28 lg:mr-28 xsm:ml-7 xsm:mr-7'>
        <h1 className='font-bold text-xl'>Login</h1>
        {error && <h3 className='text-red-500'>{error}</h3>}
        <Form onSubmit={handleSubmit} className='flex flex-col items-center space-y-7 shadow-md p-10' replace method='post'>
          <input type='text' placeholder='email' name='email' className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' />
          <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' />
          <label className='cursor-pointer'>
            <input type='checkbox' className='form-checkbox h-5 w-5' checked={showPassword} onChange={handleShowPassword} /> showPassword
          </label>
          <button
            disabled={status === 'loading'}
            type='submit'
            className='md:p-4 xsm:p-2 xsm:px-4 md:px-9 font-bold text-white bg-brightBlue rounded-md baseline hover:shadow-2xl'
          >
            {status === 'loading' ? 'Signing in...' : 'SIGN IN'}
          </button>
        </Form>
        <div>
          Do not have an account? <Link className='text-brightBlue' to='/signup'>Sign up</Link>
        </div>
      </div>
    </>
  );
}

