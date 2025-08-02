import React from 'react';

const Header = () => {
  return (
    <header className="bg-dove-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-heading font-bold text-curious-blue-400">CodeCraft</h1>
        <nav>
          {/* Add shadcn/ui buttons here */}
        </nav>
        <div>
          {/* Add collaboration components here */}
        </div>
      </div>
    </header>
  );
};

export default Header;
