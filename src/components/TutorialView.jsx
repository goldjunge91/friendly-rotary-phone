
import React, { useState } from "react";

const TutorialView = () => {
  const [code, setCode] = useState("// Write your solution here");
  const [output, setOutput] = useState("");

  const runCode = () => {
    let result = "";
    try {
      const oldLog = console.log;
      console.log = (...args) => {
        result += args.map(String).join(" ") + "\n";
      };
      // eslint-disable-next-line no-eval
      eval(code);
      setOutput(result || "Code executed without errors.");
      console.log = oldLog;
    } catch (e) {
      setOutput(`Error: ${e.message}`);
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
        {/* Code Editor */}
        <div className="mb-4 p-4 bg-gray-900 rounded-lg">
          <textarea
            className="w-full h-40 bg-gray-700 rounded text-gray-100 p-2 font-mono resize-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>
        {/* Run/Visualize Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            className="bg-blue-600 px-4 py-2 rounded text-white"
            onClick={runCode}
          >
            Run
          </button>
          <button className="bg-green-600 px-4 py-2 rounded text-white">
            Visualize
          </button>
        </div>
        {/* Output Area */}
        <div className="mb-4 p-4 bg-gray-800 rounded-lg text-gray-200 whitespace-pre-wrap min-h-[3rem]">
          {output}
        </div>
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
