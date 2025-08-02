

import React, { useState, useEffect } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useCollaboration } from '../hooks/useCollaboration';
import { challenges } from '../js/challenges';

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

  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const currentChallenge = challenges[currentChallengeIndex];
  const [code, setCode] = useState(currentChallenge?.starterCode || '// Write your solution here');
  const [output, setOutput] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [currentLine, setCurrentLine] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);

  useEffect(() => {
    setCode(currentChallenge?.starterCode || '// Write your solution here');
    setOutput('');
  }, [currentChallengeIndex]);

  useEffect(() => {
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

  // Allow running code even if not connected as teacher or student
  const canRun = !role || role === 'teacher' || (role === 'student' && code === teacherCode);

  const runCode = () => {
    setIsPaused(false);
    try {
      // Run challenge validation function
      if (currentChallenge && typeof currentChallenge.validation === 'function') {
        const validationResult = currentChallenge.validation(code);
        if (validationResult.success) {
          setOutput('Success! Challenge passed.');
        } else {
          setOutput(`Validation failed: ${validationResult.hint || 'Try again.'}`);
        }
      } else {
        setOutput('No validation function for this challenge.');
      }
    } catch (e) {
      setOutput(`Error: ${e.message}`);
    }
  };

  const handleSetBreakpoint = line => {
    if (role === 'teacher') {
      const newBreakpoints = breakpoints.includes(line)
        ? breakpoints.filter(b => b !== line)
        : [...breakpoints, line];
      setTeacherBreakpoints(newBreakpoints);
    }
  };

  const handlePrev = () => {
    if (currentChallengeIndex > 0) setCurrentChallengeIndex(currentChallengeIndex - 1);
  };
  const handleNext = () => {
    if (currentChallengeIndex < challenges.length - 1) setCurrentChallengeIndex(currentChallengeIndex + 1);
  };

  return (
    <React.Fragment>
      {/* Modal for session controls */}
      {showSessionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-white" onClick={() => setShowSessionModal(false)}>&times;</button>
            <h3 className="text-lg font-semibold mb-4">Get Teacher Help</h3>
            <div className="flex flex-col gap-2">
              <div><strong>Role:</strong> {role || 'None'}</div>
              <div><strong>Session Code:</strong> {roomId || '-'}</div>
              <div><strong>Status:</strong> {connected ? 'Connected' : 'Disconnected'}</div>
              {!role && (
                <React.Fragment>
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
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Challenge Prompt & Navigation */}
        <section className="md:col-span-2 mb-4">
          <div className="mb-4 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{currentChallenge?.title || 'Challenge'}</h2>
            <p className="text-gray-300">{currentChallenge?.prompt || 'No description.'}</p>
          </div>
          {/* Get Teacher Help Button */}
          {!role && (
            <div className="mb-4">
              <button className="bg-blue-700 px-4 py-2 rounded text-white" onClick={() => setShowSessionModal(true)}>
                Get Teacher Help
              </button>
            </div>
          )}
          {/* Code Editor & Overlay */}
          <div className="relative mb-4 p-4 bg-gray-900 rounded-lg">
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
            {/* Student overlay: show teacher's code grayed out if not matched */}
            {role === 'student' && teacherCode && code !== teacherCode && (
              <div className="absolute inset-0 pointer-events-none bg-gray-900 bg-opacity-60 flex items-center justify-center text-gray-400 font-mono p-2 whitespace-pre-wrap z-10">
                <pre style={{ width: '100%', textAlign: 'left', margin: 0 }}>{teacherCode}</pre>
              </div>
            )}
          </div>
          {/* Run/Visualize Buttons and Navigation */}
          <div className="flex gap-2 mb-4">
            <button
              className={`bg-blue-600 px-4 py-2 rounded text-white mb-4 ${!canRun ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={runCode}
              disabled={!canRun || isPaused}
            >
              Run
            </button>
            <button className="bg-gray-700 px-4 py-2 rounded text-white" onClick={handlePrev} disabled={currentChallengeIndex === 0}>
              Previous
            </button>
            <button className="bg-gray-700 px-4 py-2 rounded text-white" onClick={handleNext} disabled={currentChallengeIndex === challenges.length - 1}>
              Next
            </button>
          </div>
          {isPaused && (
            <div className="p-4 bg-yellow-800 rounded-lg text-yellow-200 mb-2">Paused at breakpoint on line {currentLine}</div>
          )}
          <div className="mb-4 p-4 bg-gray-800 rounded-lg text-gray-200 whitespace-pre-wrap min-h-[3rem]">{output}</div>
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
    </React.Fragment>
  );
};

export default TutorialView;
          {/* Achievements & Score */}
