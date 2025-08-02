
import React, { useState } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useCollaboration } from '../hooks/useCollaboration';

const TutorialView = () => {
  const {
    role,
    roomId,
    connected,
    teacherCode,
    studentCode,
    startSession,
    joinSession,
    updateTeacherCode,
    updateStudentCode,
    breakpoints,
    setTeacherBreakpoints,
  } = useCollaboration();

  const [code, setCode] = useState('// Write your solution here');
  const [output, setOutput] = useState('');
  const [joinCode, setJoinCode] = useState('');

  React.useEffect(() => {
    if (role === 'teacher') {
      setCode(teacherCode);
    } else if (role === 'student' && teacherCode !== undefined) {
      // Only update overlay, not student's code
    }
  }, [teacherCode, role]);

  const handleCodeChange = value => {
    setCode(value);
    if (role === 'teacher') {
      updateTeacherCode(value);
    } else if (role === 'student') {
      updateStudentCode(value);
    }
  };

  // Breakpoint logic
  const [currentLine, setCurrentLine] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const canRun = role === 'teacher' || (role === 'student' && code === teacherCode);

  // Simulate breakpoint logic (for demo)
  const runCode = () => {
    let result = '';
    setIsPaused(false);
    try {
      const lines = code.split('\n');
      for (let i = 0; i < lines.length; i++) {
        setCurrentLine(i + 1);
        if (breakpoints.includes(i + 1)) {
          setIsPaused(true);
          setOutput(`Paused at breakpoint on line ${i + 1}`);
          return;
        }
        // eslint-disable-next-line no-eval
        eval(lines[i]);
      }
      setOutput(result || 'Code executed without errors.');
    } catch (e) {
      setOutput(`Error: ${e.message}`);
    }
  };

  // Teacher sets breakpoints by clicking line numbers
  const handleSetBreakpoint = line => {
    if (role === 'teacher') {
      const newBreakpoints = breakpoints.includes(line)
        ? breakpoints.filter(b => b !== line)
        : [...breakpoints, line];
      setTeacherBreakpoints(newBreakpoints);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Challenge Prompt & Navigation */}
      <section className="md:col-span-2 mb-4">
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Challenge Title</h2>
          <p className="text-gray-300">Challenge description goes here.</p>
        </div>
        {/* Session Controls & Info */}
        <div className="mb-4 p-4 bg-gray-800 rounded-lg flex flex-col gap-2">
          <div><strong>Role:</strong> {role || 'None'}</div>
          <div><strong>Session Code:</strong> {roomId || '-'}</div>
          <div><strong>Status:</strong> {connected ? 'Connected' : 'Disconnected'}</div>
          {!role && (
            <>
              <button className="bg-purple-600 px-4 py-2 rounded text-white mb-2" onClick={startSession}>Start as Teacher</button>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="bg-gray-700 text-white px-2 py-1 rounded"
                  placeholder="Enter session code"
                  value={joinCode}
                  onChange={e => setJoinCode(e.target.value)}
                />
                <button className="bg-purple-600 px-4 py-2 rounded text-white" onClick={() => joinSession(joinCode)}>Join as Student</button>
              </div>
            </>
          )}
        </div>
        {/* Code Editor & Overlay */}
        <div className="mb-4 p-4 bg-gray-900 rounded-lg relative">
          <div className="relative">
            <CodeMirror
              value={code}
              height="160px"
              extensions={[javascript()]}
              onChange={handleCodeChange}
              theme="dark"
            />
            {/* Line numbers for breakpoints (demo) */}
            {role === 'teacher' && (
              <div className="absolute left-0 top-0 h-full flex flex-col justify-start z-20">
                {code.split('\n').map((_, i) => (
                  <button
                    key={i}
                    className={`w-6 h-6 text-xs text-white bg-gray-700 rounded m-0.5 ${breakpoints.includes(i + 1) ? 'bg-red-600' : ''}`}
                    onClick={() => handleSetBreakpoint(i + 1)}
                  >{i + 1}</button>
                ))}
              </div>
            )}
          </div>
          {/* Student overlay: show teacher's code grayed out if not matched */}
          {role === 'student' && teacherCode && code !== teacherCode && (
            <div className="absolute inset-0 pointer-events-none bg-gray-900 bg-opacity-60 flex items-center justify-center text-gray-400 font-mono p-2 whitespace-pre-wrap z-10">
              <pre style={{ width: '100%', textAlign: 'left', margin: 0 }}>{teacherCode}</pre>
            </div>
          )}
        </div>
        {/* Run/Visualize Buttons */}
        <div className="flex gap-2 mb-4"></div>
        <button
          className={`bg-blue-600 px-4 py-2 rounded text-white mb-4 ${!canRun ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={runCode}
          disabled={!canRun || isPaused}
        >
          Run
        </button>
        {isPaused && (
          <div className="p-4 bg-yellow-800 rounded-lg text-yellow-200 mb-2">Paused at breakpoint on line {currentLine}</div>
        )}
        <div className="mb-4 p-4 bg-gray-800 rounded-lg text-gray-200 whitespace-pre-wrap min-h-[3rem]">{output}</div>
        {/* Navigation */}
        <div className="flex gap-2">
          <button className="bg-gray-700 px-4 py-2 rounded text-white">
            Previous
          </button>
          <button className="bg-gray-700 px-4 py-2 rounded text-white">
            Next
          </button>
        </div>
      </section>
      {/* Achievements & Score */}
      <aside className="md:col-span-1 mb-4">
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Achievements</h3>
          <ul className="list-disc pl-5 text-gray-300">
            <li>First Steps</li>
            <li>5 in a Row</li>
          </ul>
        </div>
        <div className="p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Score</h3>
          <div className="text-2xl">0</div>
        </div>
      </aside>
    </div>
  );
};

export default TutorialView;
