import React from 'react';
import LoginForm from './LoginForm';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900/80 to-blue-900/60 backdrop-blur-md">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-blue-500/20 bg-gray-950/80">
        <h2 className="text-3xl font-extrabold mb-2 text-blue-200 tracking-tight drop-shadow text-center">Login</h2>
        <div className="mb-6 text-center text-blue-300">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-400 underline hover:text-blue-600">Register here</a>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
