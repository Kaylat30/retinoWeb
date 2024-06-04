import { Form,Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../store';
import { RegisterUser, selectStatus, selectError } from '../slice/userSlice';
import { toast } from "react-toastify";


export default function Signup() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/login');
    } else if (status === 'failed') {
      toast.error(error || 'An error occurred while signing up', {
        position: 'bottom-left',
      });
    }
  }, [status, error, navigate]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstname = formData.get('firstname') as string;
    const lastname = formData.get('lastname') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    dispatch(RegisterUser({ firstname, lastname, email, password }));
  };

  return (
    <>
      {/* form section */}
      <div className='flex items-center flex-col my-10 space-y-3 lg:ml-28 lg:mr-28 xsm:ml-7 xsm:mr-7'>
        <h1 className="font-bold text-xl">Sign Up</h1>
        {error && <h3 className="text-red-500">{error}</h3>}
        <Form className='flex flex-col items-center space-y-7 shadow-md p-10' onSubmit={handleSubmit}>
          <input type='text' placeholder='First name' name="firstname" className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' />
          <input type='text' placeholder='Last name' name="lastname" className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' />
          <input type='email' placeholder='Email' name="email" className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' />
          <input type={showPassword ? "text" : "password"} name="password" placeholder='Password' className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' />
          <label className="cursor-pointer">
            <input type="checkbox" className="form-checkbox h-5 w-5" checked={showPassword} onChange={handleShowPassword} /> Show Password
          </label>
          <button
            disabled={status === "loading" }
            type='submit'
            className="md:p-4 xsm:p-2 xsm:px-4 md:px-9 font-bold text-white bg-brightBlue rounded-md baseline hover:shadow-2xl"
          >
            {status === "loading" ? "Signing up..." : "SIGN UP"}
          </button>
        </Form>
        <div>Already have an account? <Link className="text-brightGreen" to='/login'>Sign in</Link></div>
      </div>
    </>
  );
}

  