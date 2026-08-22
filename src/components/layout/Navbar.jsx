import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthBar from './AuthBar';



const navItems = [
  { to: '/', label: 'Landing' },
  { to: '/tutorial', label: 'Tutorial' },
  { to: '/playground', label: 'Playground' },
];

const Navbar = () => (
  <nav className="flex justify-between items-center py-4 px-6 bg-gray-900/80 border-b border-blue-500/20 shadow-lg">
    <div className="flex gap-6">
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `px-5 py-2 rounded-xl font-semibold text-lg transition-colors duration-200 ` +
            (isActive
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
              : 'bg-gray-800/80 text-blue-200 hover:bg-blue-700/40 hover:text-white')
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
    <AuthBar />
  </nav>
);

export default Navbar;
