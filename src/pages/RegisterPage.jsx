import React from 'react';
import RegisterForm from '../components/forms/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
