import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  logInStart,
  logInSuccess,
  logInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function logIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(logInStart());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(logInFailure(data.message));
        return;
      }
      dispatch(logInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(logInFailure(error.message));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Log In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
          type="email"
          placeholder='email'
          className='border p-3 rounded-lg text-center'
          id='email'
          onChange={handleChange} 
        />
       <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'} // Toggle type
            placeholder='password'
            className='border p-3 rounded-lg text-center w-full'
            id='password'
            onChange={handleChange} 
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? '👁️' : '🙈'} {/* Eye icon */}
          </button>
          </div>

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
