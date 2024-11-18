import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password visibility toggle
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent refreshing the page
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError();
      navigate('/log-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold mb-4 uppercase'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="text"
          placeholder='Username'
          className='border p-3 rounded-lg text-center'
          id='username'
          onChange={handleChange} required
        />
        <input
          type="email"
          placeholder='Email'
          className='border p-3 rounded-lg text-center'
          id='email'
          onChange={handleChange} required
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'} // Toggle type
            placeholder='Password'
            className='border p-3 rounded-lg text-center w-full'
            id='password'
            onChange={handleChange} 
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? '👁️' : '🔑'}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'} // Toggle type
            placeholder='Confirm Password'
            className='border p-3 rounded-lg text-center w-full'
            id='confirmPassword'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange} 
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle visibility
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showConfirmPassword ? '👁️' : '🔓'}
          </button>
        </div>
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-2'>
        <p>Have an account?</p>
        <Link to={'/log-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
