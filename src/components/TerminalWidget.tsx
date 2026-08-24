import React, { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, Trash2, Copy, Check } from 'lucide-react';
import { ScreenId } from '../types';
import { YASH_BIO } from '../data/portfolioData';
import { soundFX } from '../utils/sfx';

interface TerminalWidgetProps {
  onNavigate?: (destination: ScreenId) => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const TerminalWidget: React.FC<TerminalWidgetProps> = ({ onNavigate }) => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'yash --version',
      output: (
        <div className="text-green-400">
          Yash Sahu CLI v4.2.0 [Node v20.11.0 / React v19.0.1 / Tailwind v4.0]
        </div>
      )
    },
    {
      command: 'help',
      output: (
        <div className="text-gray-300">
          Available commands: <span className="text-[#fcd400]">about</span>, <span className="text-[#fcd400]">skills</span>, <span className="text-[#fcd400]">projects</span>, <span className="text-[#fcd400]">experience</span>, <span className="text-[#fcd400]">contact</span>, <span className="text-[#fcd400]">clear</span>, <span className="text-[#fcd400]">whoami</span>
        </div>
      )
    }
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-gray-300">
            <p><span className="text-[#fcd400]">about</span> - View bio and philosophy</p>
            <p><span className="text-[#fcd400]">skills</span> - Inspect technical stack matrix</p>
            <p><span className="text-[#fcd400]">projects</span> - List flagship projects</p>
            <p><span className="text-[#fcd400]">experience</span> - View career history & timeline</p>
            <p><span className="text-[#fcd400]">contact</span> - Get direct email & booking info</p>
            <p><span className="text-[#fcd400]">clear</span> - Reset terminal screen</p>
            <p><span className="text-[#fcd400]">whoami</span> - Display current shell user context</p>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="text-gray-200">
            <p className="font-bold text-[#fcd400]">Yash Sahu - Senior Full-Stack Engineer</p>
            <p className="mt-1">4+ years building high-throughput web apps, React architectures, and backend microservices.</p>
            {onNavigate && (
              <button
                onClick={() => onNavigate('About')}
                className="mt-2 text-xs bg-[#fcd400] text-black px-2 py-1 font-bold underline"
              >
                [ Navigate to About Page ]
              </button>
            )}
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="text-gray-200 space-y-1">
            <p className="text-green-400 font-bold">FRONTEND: React, TypeScript, Next.js, Tailwind CSS, Motion</p>
            <p className="text-blue-400 font-bold">BACKEND: Node.js, Express, Go, Python, REST, GraphQL</p>
            <p className="text-[#fcd400] font-bold">DATABASE & INFRA: PostgreSQL, Redis, Docker, GCP, Git</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="text-gray-200 space-y-1">
            <p>1. <span className="text-[#fcd400] font-bold">Resilience Analyzer</span> - System Resilience Engine</p>
            <p>2. <span className="text-[#fcd400] font-bold">Hotel Management System</span> - Automated Billing & Reservation</p>
            <p>3. <span className="text-[#fcd400] font-bold">Temperature Predictor</span> - Thermal Analytics Platform</p>
            {onNavigate && (
              <button
                onClick={() => onNavigate('Projects')}
                className="mt-2 text-xs bg-[#fcd400] text-black px-2 py-1 font-bold underline"
              >
                [ View All Projects ]
              </button>
            )}
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="text-gray-200 space-y-1">
            <p>• Senior Full Stack Engineer @ TechVentures (2024 - Present)</p>
            <p>• Frontend Architect @ CraftLabs (2022 - 2024)</p>
            <p>• Software Development Engineer @ InnoTech (2021 - 2022)</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-gray-200">
            <p>Email: <span className="text-[#fcd400]">{YASH_BIO.email}</span></p>
            <p>GitHub: <span className="text-green-400">{YASH_BIO.github.replace('https://', '')}</span></p>
            <p>Status: <span className="text-[#22c55e] font-bold">Available for contracts & full-time</span></p>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="text-yellow-300">
            guest@yashsahu.dev [Role: Valued Visitor]
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <div className="text-red-400">
            Command not recognized: '{cmd}'. Type <span className="text-[#fcd400] underline">help</span> for command list.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput('');
  };

  const copyLog = () => {
    const text = history.map((h) => `$ ${h.command}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black text-white border-4 border-black neo-shadow-lg p-4 font-mono w-full">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-red-500 rounded-full inline-block border border-black"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block border border-black"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block border border-black"></span>
          </div>
          <span className="text-xs text-gray-400 font-bold ml-2 hidden sm:inline">
            bash - yash@macbook-pro:~
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyLog}
            className="text-xs text-gray-400 hover:text-[#fcd400] flex items-center gap-1 px-2 py-0.5 border border-gray-800 hover:border-[#fcd400]"
            title="Copy Terminal Commands"
          >
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
            <span className="text-[10px]">{copied ? 'COPIED' : 'COPY'}</span>
          </button>
          <button
            onClick={() => setHistory([])}
            className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 px-2 py-0.5 border border-gray-800 hover:border-red-500"
            title="Clear Terminal"
          >
            <Trash2 className="w-3 h-3" />
            <span className="text-[10px]">CLEAR</span>
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div ref={terminalBodyRef} className="space-y-3 max-h-64 overflow-y-auto pr-2 text-xs md:text-sm leading-relaxed">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-green-400 font-bold">yash@dev:~$</span>
              <span className="text-white font-bold">{item.command}</span>
            </div>
            <div className="pl-4 border-l-2 border-gray-800 my-1">{item.output}</div>
          </div>
        ))}

      </div>

      {/* Command Input Form */}
      <form onSubmit={handleCommand} className="mt-3 pt-3 border-t-2 border-gray-800 flex items-center gap-2">
        <span className="text-green-400 font-bold text-xs md:text-sm">yash@dev:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            soundFX.playTerminalKey();
            setInput(e.target.value);
          }}
          placeholder="type 'help', 'skills', or 'projects'..."
          className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs md:text-sm"
        />
        <button
          type="submit"
          className="bg-[#fcd400] text-black px-2 py-1 font-bold text-xs hover:bg-[#ff6b00] transition-colors"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
