'use client';
import { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useAgentStore } from '@/store/useAgentStore';
import { callClaude } from '@/services/claude';
import { Spinner } from '@/components/ui/Badge';
import { agentDefs, type AgentType } from '@/data/agentDefs';

export function AgentChatOverlay() {
  const { agentChatOpen, agentChatType, closeAgentChat } = useUIStore();
  const { chatHistory, chatThinking, addChatMessage, setChatThinking } = useAgentStore();
  const [input, setInput] = useState('');

  if (!agentChatOpen || !agentChatType) return null;

  const agent = agentDefs[agentChatType as AgentType];
  if (!agent) return null;

  const history = chatHistory[agentChatType] || [];

  const send = async () => {
    const text = input.trim();
    if (!text || chatThinking) return;
    setInput('');

    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    addChatMessage(agentChatType, { role: 'user', content: text, time });
    setChatThinking(true);

    try {
      const msgs = [...history, { role: 'user' as const, content: text }]
        .map((m) => ({ role: m.role, content: m.content }));
      const reply = await callClaude(agent.system, msgs);
      addChatMessage(agentChatType, {
        role: 'assistant',
        content: reply,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      });
    } catch (e: any) {
      addChatMessage(agentChatType, { role: 'assistant', content: `⚠️ Error: ${e.message}`, time: '' });
    } finally {
      setChatThinking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-[520px] max-h-[80vh] rounded-[18px] flex flex-col overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
        style={{
          background: '#0a0d16',
          border: `1px solid ${agent.color}35`,
          boxShadow: `0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px ${agent.color}25`,
        }}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.065)] flex items-center gap-3" style={{ background: agent.colorBg }}>
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-xl" style={{ background: agent.color + '22', border: `1px solid ${agent.color}35` }}>
            {agent.icon}
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-[#eef0f8]">{agent.name}</div>
            <div className="text-[10.5px] mt-0.5" style={{ color: agent.color }}>Spesialis AI Agent · NAVI Pro</div>
          </div>
          <button onClick={closeAgentChat} className="w-7 h-7 rounded-[7px] border border-[rgba(255,255,255,0.065)] flex items-center justify-center text-[#424e62] hover:text-[#7e8a9f] hover:bg-[#161b28] transition-colors cursor-pointer text-sm">✕</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[240px]">
          {history.length === 0 && (
            <div className="text-center py-8">
              <div className="text-3xl mb-2">{agent.icon}</div>
              <p className="text-[12.5px] font-semibold text-[#eef0f8] mb-1">{agent.name} siap membantu</p>
              <p className="text-[11px] text-[#424e62]">Tanya tentang {agent.shortName.toLowerCase()} tokomu</p>
            </div>
          )}
          {history.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[85%] rounded-[12px] px-3.5 py-2.5 text-[12.5px] leading-relaxed"
                style={msg.role === 'user'
                  ? { background: `linear-gradient(135deg, ${agent.color}, ${agent.color}cc)`, color: '#fff' }
                  : { background: '#0f1320', border: '1px solid rgba(255,255,255,0.065)', color: '#eef0f8' }
                }
              >
                {msg.content}
                <div className="text-[9px] opacity-40 mt-1 text-right">{msg.time}</div>
              </div>
            </div>
          ))}
          {chatThinking && (
            <div className="flex justify-start">
              <div className="bg-[#0f1320] border border-[rgba(255,255,255,0.065)] rounded-[12px] px-4 py-3 flex items-center gap-2">
                <Spinner size={12} color={agent.color} />
                <span className="text-[11px] text-[#424e62]">{agent.shortName} sedang menganalisis...</span>
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
              placeholder={`Tanya ${agent.shortName}...`}
              className="flex-1 bg-[#0a0d16] border border-[rgba(255,255,255,0.065)] rounded-[9px] px-3.5 py-2 text-[12.5px] text-[#eef0f8] placeholder:text-[#2e3649] outline-none transition-all"
              style={{ ['--tw-ring-color' as any]: agent.color }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || chatThinking}
              className="w-9 h-9 rounded-[9px] flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-lg"
              style={{ background: `linear-gradient(135deg, ${agent.color}, ${agent.color}aa)`, boxShadow: `0 2px 12px ${agent.color}40` }}
            >
              {chatThinking ? <Spinner size={14} color="#fff" /> : <span className="text-sm">↑</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
