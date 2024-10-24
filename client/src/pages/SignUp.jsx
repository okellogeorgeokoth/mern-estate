import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] =useState({});
  const [error, setError]=useState();
  const [loading, setLoading] =useState(false);
  const navigate=useNavigate();
  const handleChange = (e) =>{
  setFormData(
    {
    ...formData,
    [e.target.id]: e.target.value, 
  });
};
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent refreshing the page
    try {
      setLoading(true);
    const res = await fetch('/api/auth/signup', 
      {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData),
      });
    const data = await res.json();
    console.log(data);
    if(data.success === false){
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
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
      <input type="text" placeholder='username' className='border p-3 rounded-lg text-center' id='username' onChange={handleChange}/>
      <input type="email" placeholder='email' className='border p-3 rounded-lg text-center' id='email'onChange={handleChange}/>
      <input type="password" placeholder='password' className='border p-3 rounded-lg text-center' id='password'onChange={handleChange}/>
      <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?'Loading...': 'SignUp'}</button>
   
    </form>
    <div className='flex gap-2 mt-2'>
      <p>Have an account?</p>
      <Link to={'/log-in'}><span className='text-blue-700'>Sign in</span></Link>
    </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
</div>
  )
}
