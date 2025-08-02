import React from 'react';

const LandingPage = () => (
  <section className="flex flex-col items-center justify-center min-h-[60vh] py-20">
    <div className="bg-gradient-to-br from-blue-900/80 to-purple-900/60 p-10 rounded-3xl shadow-2xl border border-blue-500/30 backdrop-blur-xl max-w-2xl w-full text-center">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6 drop-shadow-lg animate-fade-in">Friendly Rotary Phone</h1>
      <p className="text-2xl text-blue-100 mb-8 font-medium animate-fade-in">Collaborative JavaScript learning, live code-along, and visual debugging.<br/>Empower your coding journey with modern tools and a beautiful UI.</p>
      <div className="flex flex-col md:flex-row gap-6 justify-center mt-8">
        <a href="/tutorial" className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl text-white font-bold shadow-lg hover:scale-105 transition-transform text-xl">Start Tutorial</a>
        <a href="/playground" className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl text-white font-bold shadow-lg hover:scale-105 transition-transform text-xl">Go to Playground</a>
      </div>
    </div>
    <div className="mt-16 text-blue-300 text-lg animate-fade-in-slow">Made with ❤️ for collaborative learning</div>
  </section>
);

export default LandingPage;
