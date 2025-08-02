import React from 'react';

import { Avatar } from './ui/avatar.jsx';

const Header = () => {
  const [user, setUser] = React.useState(null);

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleLogout = () => {
    setUser(null);
    // Optionally clear localStorage/session
    localStorage.removeItem('user');
  };

  React.useEffect(() => {
    // Check localStorage for user info
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <header className="bg-dove-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-heading font-bold text-curious-blue-400">CodeCraft</h1>
        <nav className="flex gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-5 py-2 rounded-xl font-semibold text-lg transition-colors duration-200 ` +
              (isActive
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-gray-800/80 text-blue-200 hover:bg-blue-700/40 hover:text-white')
            }
          >
            Landing
          </NavLink>
          <NavLink
            to="/tutorial"
            className={({ isActive }) =>
              `px-5 py-2 rounded-xl font-semibold text-lg transition-colors duration-200 ` +
              (isActive
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-gray-800/80 text-blue-200 hover:bg-blue-700/40 hover:text-white')
            }
          >
            Tutorial
          </NavLink>
          <NavLink
            to="/playground"
            className={({ isActive }) =>
              `px-5 py-2 rounded-xl font-semibold text-lg transition-colors duration-200 ` +
              (isActive
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-gray-800/80 text-blue-200 hover:bg-blue-700/40 hover:text-white')
            }
          >
            Playground
          </NavLink>
        </nav>
        <div className="flex items-center gap-4">
          {/* Collaboration components here */}
          {user ? (
            <>
              <Avatar name={user.email} />
              <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <button onClick={handleLogin} className="bg-blue-600 text-white px-3 py-1 rounded">Login</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
