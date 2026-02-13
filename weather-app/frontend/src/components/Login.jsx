import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/login', {
        username,
        password
      });

      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img 
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" 
          alt="Your Company" 
          className="mx-auto h-10 w-auto" 
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && (
          <div className="mb-4 rounded-md bg-red-900/30 p-3 border border-red-800 text-center">
            <p className="text-sm font-medium text-red-300">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-200">
              Username
            </label>
            <div className="mt-2">
              <input 
                id="username" 
                name="username" 
                type="text" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
                bg-white/5 text-white ring-white/10 placeholder:text-gray-500 focus:ring-indigo-500" 
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-200">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password" 
                className="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
                bg-white/5 text-white ring-white/10 placeholder:text-gray-500 focus:ring-indigo-500" 
              />
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
              bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          New here?{' '}
          <span className="font-semibold text-indigo-400 hover:text-indigo-300">
            Account will be created automatically
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
