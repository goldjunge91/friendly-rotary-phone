import React from 'react';
import { Avatar } from './ui/avatar.jsx';

const AuthBar = () => {
  const [user, setUser] = React.useState(null);

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  React.useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <Avatar name={user.email} />
          <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
        </>
      ) : (
        <button onClick={handleLogin} className="bg-blue-600 text-white px-3 py-1 rounded">Login</button>
      )}
    </div>
  );
};

export default AuthBar;
