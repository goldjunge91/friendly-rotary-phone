import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const PlaygroundView = () => {
  const [code, setCode] = useState('// Write your JavaScript code here');
  const [output, setOutput] = useState('');

  const runCode = () => {
    let result = '';
    try {
      // Capture console.log output
      const oldLog = console.log;
      console.log = (...args) => {
        result += args.map(String).join(' ') + '\n';
      };
      // eslint-disable-next-line no-eval
      eval(code);
      setOutput(result || 'Code executed without errors.');
      console.log = oldLog;
    } catch (e) {
      setOutput(`Error: ${e.message}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Code Editor & Run Button */}
      <section className="mb-4">
        <div className="mb-4 p-4 bg-gray-900 rounded-lg">
          <CodeMirror
            value={code}
            height="160px"
            extensions={[javascript()]}
            onChange={value => setCode(value)}
            theme="dark"
          />
        </div>
        <button className="bg-blue-600 px-4 py-2 rounded text-white mb-4" onClick={runCode}>Run</button>
        <div className="p-4 bg-gray-800 rounded-lg text-gray-200 whitespace-pre-wrap min-h-[3rem]">{output}</div>
      </section>
      {/* Collaboration Controls */}
      <aside className="mb-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Collaboration</h3>
          <button className="bg-purple-600 px-4 py-2 rounded text-white mb-2">Start Session</button>
          <button className="bg-purple-600 px-4 py-2 rounded text-white">Join Session</button>
        </div>
      </aside>
    </div>
  );
};

export default PlaygroundView;
