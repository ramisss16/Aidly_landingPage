import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/adminApi';
import AidlyLogo from '../../../assets/Aidly.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await login({ email, password });
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.admin));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #1A5F48 0%, #4FA391 100%)' }}>
      <div className="bg-white rounded-[40px] shadow-2xl p-12 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
           <img src={AidlyLogo} alt="Aidly" className="h-20 w-auto" />
        </div>
        <h2 className="text-3xl font-bold text-[#1A5F48] mb-2 italic" style={{ fontFamily: 'Inria Serif, serif' }}>
          Aidly Corporate
        </h2>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-10">Admin Portal</p>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#F3F4F6] border-none rounded-2xl py-4 px-6 text-gray-700 focus:ring-2 focus:ring-[#1A5F48] focus:outline-none font-medium"
            placeholder="Email Address"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#F3F4F6] border-none rounded-2xl py-4 px-6 text-gray-700 focus:ring-2 focus:ring-[#1A5F48] focus:outline-none font-medium"
            placeholder="Password"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A5F48] text-white font-bold py-4 rounded-2xl text-xl hover:bg-[#144937] transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
