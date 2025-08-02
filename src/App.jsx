
import React, { useState } from 'react';
import Header from './components/Header';
import TutorialView from './components/TutorialView';
import PlaygroundView from './components/PlaygroundView';
import { Button } from './components/ui/button';

function App() {
  const [view, setView] = useState('tutorial');

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen font-body">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Button onClick={() => setView('tutorial')} variant={view === 'tutorial' ? 'default' : 'outline'}>
            Tutorial
          </Button>
          <Button onClick={() => setView('playground')} variant={view === 'playground' ? 'default' : 'outline'} className="ml-4">
            Playground
          </Button>
        </div>
        {view === 'tutorial' ? <TutorialView /> : <PlaygroundView />}
      </main>
    </div>
  );
}



export default App;
