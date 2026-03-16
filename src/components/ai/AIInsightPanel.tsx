'use client';
import { useState, useRef, useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useAgentStore } from '@/store/useAgentStore';
import { useDashboardStore } from '@/store/useDashboardStore';
import { callClaude, buildDashboardContext } from '@/services/claude';
import { Spinner } from '@/components/ui/Badge';
import { agentDefs, type AgentType } from '@/data/agentDefs';

// ── NAVI Main Agent Panel ─────────────────────────────────────────────────

export function AIInsightPanel() {
  const { agentOpen, closeAgent } = useUIStore();
  const { history, thinking, addMessage, setThinking } = useAgentStore();
  const { currentPeriod, data } = useDashboardStore();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  if (!agentOpen) return null;

  const send = async () => {
    const text = input.trim();
    if (!text || thinking) return;
    setInput('');
    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    addMessage({ role: 'user', content: text, time });
    setThinking(true);
    try {
      const system = buildDashboardContext(currentPeriod, data.gmv, data.pesanan);
      const msgs = [...history, { role: 'user' as const, content: text, time }]
        .map((m) => ({ role: m.role, content: m.content }));
      const reply = await callClaude(system, msgs);
      addMessage({ role: 'assistant', content: reply, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) });
    } catch (e: any) {
      addMessage({ role: 'assistant', content: `Error: ${e.message}`, time: '' });
    } finally {
      setThinking(false);
    }
  };

  const starters = ['Produk mana yang paling laris bulan ini?', 'Kapan peak sales biasanya terjadi?', 'Rekomendasi stok untuk minggu depan?'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={closeAgent}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <div
        className="relative w-[500px] max-h-[78vh] bg-[#0d1117] border border-[rgba(255,255,255,0.1)] rounded-[16px] shadow-[0_32px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-cmdIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(99,102,241,0.5)] to-transparent" />

        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-3 border-b border-[rgba(255,255,255,0.07)]">
          <div className="w-8 h-8 rounded-[9px] bg-[rgba(99,102,241,0.12)] border border-[rgba(99,102,241,0.2)] flex items-center justify-center">
            <svg className="w-4 h-4 text-[#818cf8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-[650] text-[#e6edf3]">NAVI Agent</div>
            <div className="text-[10.5px] text-[#484f58]">AI Analytics · Powered by Claude</div>
          </div>
          <button onClick={closeAgent} className="w-7 h-7 rounded-[6px] flex items-center justify-center text-[#484f58] hover:text-[#7d8590] hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer text-sm">✕</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[220px]">
          {history.length === 0 && (
            <div className="py-6">
              <p className="text-[11.5px] text-[#30363d] mb-3">Coba tanya:</p>
              <div className="flex flex-col gap-1.5">
                {starters.map((q) => (
                  <button key={q} onClick={() => setInput(q)}
                    className="text-left text-[12px] text-[#484f58] hover:text-[#818cf8] transition-colors px-3 py-2 rounded-[7px] hover:bg-[rgba(99,102,241,0.06)] cursor-pointer border border-transparent hover:border-[rgba(99,102,241,0.12)]">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {history.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-[11px] px-3.5 py-2.5 text-[12.5px] leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.2)] text-[#e6edf3]'
                  : 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] text-[#c9d1d9]'
              }`}>
                {msg.content}
                {msg.time && <div className="text-[9px] text-[#30363d] mt-1.5 text-right">{msg.time}</div>}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex justify-start">
              <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] rounded-[11px] px-4 py-3 flex items-center gap-2">
                <Spinner size={12} color="#484f58" />
                <span className="text-[11px] text-[#484f58]">Menganalisis...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-[rgba(255,255,255,0.07)]">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Tanya tentang data tokomu..."
              className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[8px] px-3.5 py-2 text-[12.5px] text-[#e6edf3] placeholder:text-[#30363d] outline-none focus:border-[rgba(99,102,241,0.4)] focus:bg-[rgba(99,102,241,0.04)] transition-all"
            />
            <button
              onClick={send}
              disabled={!input.trim() || thinking}
              className="w-9 h-9 rounded-[8px] bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.25)] flex items-center justify-center text-[#818cf8] hover:bg-[rgba(99,102,241,0.25)] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {thinking ? <Spinner size={14} color="#818cf8" /> : <span className="text-sm leading-none">↑</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Agent Grid ─────────────────────────────────────────────────────────────

export function AgentGrid() {
  const { openAgentChat } = useUIStore();
  const agents = Object.entries(agentDefs) as [AgentType, typeof agentDefs[AgentType]][];

  return (
    <div className="rounded-[12px] border border-[rgba(255,255,255,0.07)] bg-[#0d1117] p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[12.5px] font-[650] text-[#c9d1d9]">AI Agents</h3>
          <p className="text-[10.5px] text-[#484f58] mt-0.5">4 spesialis · Claude</p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-[5px] bg-[rgba(16,217,160,0.07)] border border-[rgba(16,217,160,0.15)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10d9a0] animate-livePulse" />
          <span className="text-[10px] font-[600] text-[#10d9a0]">Aktif</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {agents.map(([type, agent]) => (
          <button
            key={type}
            onClick={() => openAgentChat(type)}
            className="text-left p-3.5 rounded-[10px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.1)] hover:-translate-y-px transition-all cursor-pointer group"
          >
            <div className="text-xl mb-2.5">{agent.icon}</div>
            <div className="text-[11.5px] font-[600] text-[#c9d1d9] mb-0.5">{agent.name}</div>
            <div className="text-[10px] text-[#484f58] group-hover:text-[#7d8590] transition-colors">Chat →</div>
          </button>
        ))}
      </div>
    </div>
  );
}
