'use client';
import { useState, useRef, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useUIStore } from '@/store/useUIStore';
import { useAgentStore } from '@/store/useAgentStore';
import { callClaude } from '@/services/claude';
import { Spinner } from '@/components/ui/Badge';
import { agentDefs, type AgentType } from '@/data/agentDefs';

export function AgentChatOverlay() {
  const { agentChatOpen, agentChatType, closeAgentChat } = useUIStore();
  const { chatHistory, chatThinking, addChatMessage, setChatThinking } = useAgentStore();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const agent = agentChatType ? agentDefs[agentChatType as AgentType] : null;
  const history = agentChatType ? (chatHistory[agentChatType] || []) : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const send = async () => {
    if (!agentChatType || !agent) return;
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
        role: 'assistant', content: reply,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      });
    } catch (e: any) {
      addChatMessage(agentChatType, { role: 'assistant', content: `Error: ${e.message}`, time: '' });
    } finally {
      setChatThinking(false);
    }
  };

  return (
    <Dialog.Root open={agentChatOpen && !!agent} onOpenChange={(open) => !open && closeAgentChat()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] animate-fadeIn" />
        <Dialog.Content
          className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-[500px] max-h-[78vh] bg-[#0d1117] rounded-[16px] flex flex-col overflow-hidden
            border border-[rgba(255,255,255,0.1)] shadow-[0_32px_80px_rgba(0,0,0,0.8)]
            animate-cmdIn focus:outline-none"
          aria-describedby={undefined}
        >
          {agent && (
            <>
              {/* Top gradient line */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${agent.color}60, transparent)` }}
              />

              {/* Header */}
              <Dialog.Title asChild>
                <div className="px-5 py-4 flex items-center gap-3 border-b border-[rgba(255,255,255,0.07)] flex-shrink-0">
                  <div
                    className="w-8 h-8 rounded-[9px] flex items-center justify-center text-lg"
                    style={{ background: agent.color + '15', border: `1px solid ${agent.color}30` }}
                  >
                    {agent.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-[650] text-[#e6edf3]">{agent.name}</div>
                    <div className="text-[10.5px] mt-0.5" style={{ color: agent.color + 'cc' }}>
                      AI Specialist · NAVI Pro
                    </div>
                  </div>
                  <Dialog.Close asChild>
                    <button className="w-7 h-7 rounded-[6px] flex items-center justify-center text-[#484f58] hover:text-[#7d8590] hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer text-sm">
                      ✕
                    </button>
                  </Dialog.Close>
                </div>
              </Dialog.Title>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[220px]">
                {history.length === 0 && (
                  <div className="flex flex-col items-center py-8 gap-2">
                    <span className="text-3xl">{agent.icon}</span>
                    <p className="text-[12px] font-[550] text-[#c9d1d9]">{agent.name} siap membantu</p>
                    <p className="text-[11px] text-[#484f58]">Tanya tentang {agent.shortName.toLowerCase()} tokomu</p>
                  </div>
                )}
                {history.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className="max-w-[85%] rounded-[11px] px-3.5 py-2.5 text-[12.5px] leading-relaxed"
                      style={msg.role === 'user'
                        ? { background: agent.color + '20', border: `1px solid ${agent.color}30`, color: '#e6edf3' }
                        : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#c9d1d9' }
                      }
                    >
                      {msg.content}
                      {msg.time && <div className="text-[9px] text-[#30363d] mt-1.5 text-right">{msg.time}</div>}
                    </div>
                  </div>
                ))}
                {chatThinking && (
                  <div className="flex justify-start">
                    <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] rounded-[11px] px-4 py-3 flex items-center gap-2">
                      <Spinner size={12} color={agent.color} />
                      <span className="text-[11px] text-[#484f58]">{agent.shortName} menganalisis...</span>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-[rgba(255,255,255,0.07)] flex-shrink-0">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
                    placeholder={`Tanya ${agent.shortName}...`}
                    className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[8px] px-3.5 py-2 text-[12.5px] text-[#e6edf3] placeholder:text-[#30363d] outline-none transition-all"
                    style={{ ['--tw-ring-shadow' as any]: `0 0 0 2px ${agent.color}30` }}
                    onFocus={(e) => e.target.style.borderColor = agent.color + '50'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                  <button
                    onClick={send}
                    disabled={!input.trim() || chatThinking}
                    className="w-9 h-9 rounded-[8px] flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    style={{ background: agent.color + '25', border: `1px solid ${agent.color}40`, color: agent.color }}
                  >
                    {chatThinking ? <Spinner size={14} color={agent.color} /> : <span className="text-sm leading-none">↑</span>}
                  </button>
                </div>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
