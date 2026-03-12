'use client';
import { useState } from 'react';
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
      addMessage({ role: 'assistant', content: `⚠️ Error: ${e.message}`, time: '' });
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-[520px] max-h-[80vh] bg-[#0a0d16] border border-[rgba(99,102,241,0.25)] rounded-[18px] shadow-[0_24px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(99,102,241,0.2)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.065)] flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#6366f1] to-[#4f46e5] flex items-center justify-center text-lg shadow-[0_4px_16px_rgba(99,102,241,0.4)]">🤖</div>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-[#eef0f8]">NAVI Agent</div>
            <div className="text-[10.5px] text-[#424e62] mt-0.5">AI Analytics Assistant · Powered by Claude</div>
          </div>
          <button onClick={closeAgent} className="w-7 h-7 rounded-[7px] border border-[rgba(255,255,255,0.065)] flex items-center justify-center text-[#424e62] hover:text-[#7e8a9f] hover:bg-[#161b28] transition-colors cursor-pointer text-sm">✕</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[240px]">
          {history.length === 0 && (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">✨</div>
              <p className="text-[12px] text-[#424e62]">Tanya apa saja tentang data tokomu</p>
              <div className="mt-4 flex flex-col gap-2">
                {['Produk mana yang paling laris bulan ini?', 'Kapan peak sales biasanya terjadi?', 'Rekomendasi stok untuk minggu depan?'].map((q) => (
                  <button key={q} onClick={() => setInput(q)} className="text-[11px] text-[#6366f1] hover:text-[#818cf8] text-left transition-colors cursor-pointer">
                    → {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {history.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-[12px] px-3.5 py-2.5 text-[12.5px] leading-relaxed
                ${msg.role === 'user'
                  ? 'bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-white'
                  : 'bg-[#0f1320] border border-[rgba(255,255,255,0.065)] text-[#eef0f8]'
                }`}>
                {msg.content}
                <div className="text-[9px] opacity-40 mt-1 text-right">{msg.time}</div>
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex justify-start">
              <div className="bg-[#0f1320] border border-[rgba(255,255,255,0.065)] rounded-[12px] px-4 py-3 flex items-center gap-2">
                <Spinner size={12} />
                <span className="text-[11px] text-[#424e62]">NAVI sedang menganalisis...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.055)]">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Tanya NAVI tentang data tokomu..."
              className="flex-1 bg-[#0a0d16] border border-[rgba(255,255,255,0.065)] rounded-[9px] px-3.5 py-2 text-[12.5px] text-[#eef0f8] placeholder:text-[#2e3649] outline-none focus:border-[rgba(99,102,241,0.5)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all"
            />
            <button
              onClick={send}
              disabled={!input.trim() || thinking}
              className="w-9 h-9 rounded-[9px] bg-gradient-to-br from-[#6366f1] to-[#4f46e5] flex items-center justify-center text-white shadow-[0_2px_12px_rgba(99,102,241,0.4)] hover:from-[#818cf8] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {thinking ? <Spinner size={14} color="#fff" /> : <span className="text-sm">↑</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Specialized Agent Grid ─────────────────────────────────────────────────

export function AgentGrid() {
  const { openAgentChat } = useUIStore();
  const agents = Object.entries(agentDefs) as [AgentType, typeof agentDefs[AgentType]][];

  return (
    <div className="bg-gradient-to-br from-[#0f1320] to-[#0b0e18] rounded-[14px] border border-[rgba(255,255,255,0.065)] p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[13px] font-bold text-[#eef0f8]">AI Agents</h3>
          <p className="text-[11px] text-[#424e62] mt-0.5">4 agen spesialis · Powered by Claude</p>
        </div>
        <span className="animate-badgePulse px-2 py-1 rounded-[6px] bg-[rgba(16,217,160,0.09)] text-[#10d9a0] border border-[rgba(16,217,160,0.22)] text-[10px] font-bold">
          ● AKTIF
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {agents.map(([type, agent]) => (
          <button
            key={type}
            onClick={() => openAgentChat(type)}
            className="text-left p-4 rounded-[12px] border hover:-translate-y-[2px] hover:shadow-lg transition-all cursor-pointer"
            style={{ background: agent.colorBg, borderColor: agent.color + '35' }}
          >
            <div className="text-2xl mb-2">{agent.icon}</div>
            <div className="text-[12px] font-bold text-[#eef0f8] mb-1">{agent.name}</div>
            <div className="text-[10.5px]" style={{ color: agent.color }}>Klik untuk chat →</div>
          </button>
        ))}
      </div>
    </div>
  );
}
