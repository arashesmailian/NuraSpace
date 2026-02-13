import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MessageList from './MessageList';

const Home = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    socketRef.current = io('http://localhost:5001', {
      auth: { token: token }
    });

    socketRef.current.on('connect_error', (err) => {
      if (err.message === 'Authentication error') {
        localStorage.removeItem('token');
        navigate('/login');
      }
    });

    socketRef.current.on('new_message', (data) => {
      toast.info(data.text, {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      });
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [token, navigate]);

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setWeather(null);
    setMessages([]);

    try {
      const weatherRes = await axios.get(`http://localhost:5001/api/weather/${cityName}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWeather(weatherRes.data);

      try {
        const messagesRes = await axios.get(`http://localhost:5001/api/message/${cityName}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(messagesRes.data);
      } catch (msgErr) {
        console.error("Could not fetch messages", msgErr);
      }
      
      if (socketRef.current && socketRef.current.connected) {
          socketRef.current.emit('join_city', cityName);
      }

    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        toast.error('City not found');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city);
  };

  const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
  };

  return (
    <div className="min-h-screen font-sans bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="border-b bg-gray-800 border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">WeatherApp</span>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors bg-gray-700 text-white hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="max-w-xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-0 py-3 pl-4 pr-14 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-gray-800 text-white ring-gray-700"
              placeholder="Search for a city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 rounded-md p-1.5 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-indigo-500"
            >
              {loading ? (
                 <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              )}
            </button>
          </form>
        </div>

        {/* Content Grid */}
        {weather ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weather Card */}
            <div className="rounded-lg shadow p-6 border transition-colors bg-gray-800 border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{weather.name}</h2>
                  <p className="text-sm text-gray-400">{weather.sys.country}</p>
                </div>
                <div className="text-right">
                   <p className="text-4xl font-bold text-white">{Math.round(weather.main.temp)}°C</p>
                   <p className="text-sm text-gray-400 capitalize">{weather.weather[0].description}</p>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-6 border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Humidity</p>
                    <p className="text-lg font-semibold text-white">{weather.main.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Wind</p>
                    <p className="text-lg font-semibold text-white">{weather.wind.speed} m/s</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Component */}
            <MessageList cityName={weather.name} messages={messages} />
          </div>
        ) : (
          !loading && (
            <div className="text-center py-20">
              <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-semibold text-gray-200">No city selected</h3>
              <p className="mt-1 text-sm text-gray-500">Search for a city to view weather and live messages.</p>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default Home;
