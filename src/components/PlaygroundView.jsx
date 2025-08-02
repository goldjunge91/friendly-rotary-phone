




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollaboration } from '../hooks/useCollaboration';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const PlaygroundView = () => {
  const navigate = useNavigate();
  // Disconnect logic
  const handleDisconnect = () => {
    if (typeof setTeacherBreakpoints === 'function') setTeacherBreakpoints([]);
    if (typeof updateTeacherCode === 'function') updateTeacherCode('// Write your JavaScript code here');
    if (typeof updateStudentCode === 'function') updateStudentCode('');
    setCode('// Write your JavaScript code here');
    setOutput('');
    setJoinCode('');
    setCurrentLine(null);
    setIsPaused(false);
    // Navigate to playground after disconnect
    navigate('/playground');
  };
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

  const [code, setCode] = useState('// Write your JavaScript code here');
  const [output, setOutput] = useState('');
  const [joinCode, setJoinCode] = useState('');

  // Sync code for teacher/student
  React.useEffect(() => {
    if (role === 'teacher') {
      setCode(teacherCode);
    } else if (role === 'student' && teacherCode !== undefined) {
      // Only update overlay, not student's code
      // Student types their own code
    }
  }, [teacherCode, role]);

  // Teacher updates code
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

  // Only allow student to run code if it matches teacher's code
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
    <React.Fragment>
      {/* Modal for session controls */}
      {/* Show modal only if needed, similar to TutorialView */}
      {/* Main layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2 md:px-0">
        {/* Playground Card */}
        <section className="md:col-span-2 mb-4">
          <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-blue-900/60 shadow-xl border border-blue-500/20 backdrop-blur-md">
            <h2 className="text-3xl font-extrabold mb-2 text-blue-200 tracking-tight drop-shadow">Playground</h2>
            <p className="text-lg text-blue-100 mb-2 font-medium">Write and run any JavaScript code. Collaborate live if you join a session.</p>
          </div>
          {/* Code Editor & Overlay */}
          <div className="relative mb-6 p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-blue-900/60 shadow-xl border border-blue-500/20 backdrop-blur-md">
            <CodeMirror
              value={code}
              height="200px"
              extensions={[javascript()]}
              onChange={handleCodeChange}
              theme="dark"
              className="rounded-xl border border-blue-500/20 shadow-inner"
            />
            {/* Line numbers for breakpoints (demo) */}
            {role === 'teacher' && (
              <div className="absolute left-0 top-0 h-full flex flex-col justify-start z-20">
                {code.split('\n').map((_, i) => (
                  <button
                    key={i}
                    className={`w-7 h-7 text-xs text-white bg-blue-700/80 rounded-full m-0.5 shadow-lg border border-blue-400/40 hover:bg-purple-600 transition-colors ${breakpoints.includes(i + 1) ? 'bg-red-600' : ''}`}
                    onClick={() => handleSetBreakpoint(i + 1)}
                  >{i + 1}</button>
                ))}
              </div>
            )}
            {/* Student overlay: show teacher's code grayed out if not matched */}
            {role === 'student' && teacherCode && code !== teacherCode && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-gray-900/80 to-blue-900/60 bg-opacity-70 flex items-center justify-center text-blue-300 font-mono p-2 whitespace-pre-wrap z-10 rounded-xl border border-blue-500/20">
                <pre style={{ width: '100%', textAlign: 'left', margin: 0 }}>{teacherCode}</pre>
              </div>
            )}
          </div>
          {/* Run Button */}
          <div className="flex gap-4 mb-6 justify-end">
            <button
              className={`bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-xl text-white font-bold shadow-lg hover:scale-105 transition-transform ${!canRun ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={runCode}
              disabled={!canRun || isPaused}
            >
              <span className="inline-block align-middle mr-2">▶️</span> Run
            </button>
          </div>
          {isPaused && (
            <div className="p-4 bg-yellow-800/80 rounded-xl text-yellow-200 mb-4 shadow-lg animate-pulse">Paused at breakpoint on line {currentLine}</div>
          )}
          <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-blue-800/60 shadow-xl border border-blue-500/20 text-blue-100 whitespace-pre-wrap min-h-[3rem] font-mono text-base">
            {output}
          </div>
        </section>
        {/* Session Controls, Achievements & Score */}
        <aside className="md:col-span-1 mb-4 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-blue-900/60 shadow-xl border border-blue-500/20 backdrop-blur-md flex flex-col gap-4">
            <h3 className="text-xl font-bold mb-2 text-blue-200 tracking-tight">Collaboration</h3>
            <div className="flex flex-col gap-2 text-blue-100">
              <div><strong>Role:</strong> {role || 'None'}</div>
              <div><strong>Session Code:</strong> {roomId || '-'}</div>
              <div><strong>Status:</strong> {connected ? 'Connected' : 'Disconnected'}</div>
              {!role ? (
                <React.Fragment>
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-lg text-white font-semibold shadow hover:scale-105 transition-transform mb-2" onClick={startSession}>Start as Teacher</button>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      className="bg-gray-800/80 text-white px-3 py-2 rounded-lg border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                      placeholder="Enter session code"
                      value={joinCode}
                      onChange={e => setJoinCode(e.target.value)} />
                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-lg text-white font-semibold shadow hover:scale-105 transition-transform" onClick={() => joinSession(joinCode)}>Join as Student</button>
                  </div>
                </React.Fragment>
              ) : (
                <button className="bg-gradient-to-r from-red-600 to-pink-600 px-4 py-2 rounded-lg text-white font-semibold shadow hover:scale-105 transition-transform mb-2" onClick={handleDisconnect}>Disconnect</button>
              )}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-blue-900/60 shadow-xl border border-blue-500/20 backdrop-blur-md">
            <h3 className="text-xl font-bold mb-4 text-blue-200 tracking-tight">Achievements</h3>
            <ul className="list-disc pl-5 text-blue-100 text-base">
              <li>First Steps</li>
              <li>5 in a Row</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-blue-800/60 shadow-xl border border-blue-500/20 backdrop-blur-md flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2 text-blue-200 tracking-tight">Score</h3>
            <div className="text-4xl font-extrabold text-blue-300 drop-shadow">0</div>
          </div>
        </aside>
      </div>
    </React.Fragment>
  );
}

export default PlaygroundView;
