'use client';

/**
 * NAVI Pro — Demo Page
 * Route: /demo/[slug]
 *
 * Usage:
 *   1. Buat folder: src/app/demo/[slug]/
 *   2. Simpan file ini sebagai: src/app/demo/[slug]/page.tsx
 *   3. Buat API endpoint: src/app/api/demo/[slug]/route.ts (lihat bagian bawah file)
 *
 * Query params yang didukung:
 *   ?shop=NamaToko&niche=fashion&gmv=285jt&orders=1847
 *   Atau fetch dari database berdasarkan slug
 */

import { useState, useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DemoConfig {
  shopName: string;
  niche: 'fashion' | 'beauty' | 'food' | 'electronics' | 'general';
  gmv: string;
  orders: string;
  platforms: string[];
  prospectName?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

// ─── Niche Config ─────────────────────────────────────────────────────────────

const NICHE_CONFIG = {
  fashion: {
    label: 'Fashion & Apparel',
    emoji: '👗',
    color: '#f43f5e',
    products: ['Dress Casual', 'Kemeja Premium', 'Celana Jeans', 'Blouse Kerja'],
    painPoints: ['return rate tinggi', 'stok size sering habis duluan', 'harga kompetitor lebih murah di Shopee'],
    agents: ['Inventory Manager', 'Price Optimizer', 'Return Analyzer', 'TikTok Content Strategist'],
  },
  beauty: {
    label: 'Beauty & Skincare',
    emoji: '✨',
    color: '#f59e0b',
    products: ['Serum Vitamin C', 'Moisturizer SPF', 'Lip Tint', 'Sheet Mask'],
    painPoints: ['expired stock susah diprediksi', 'flash sale habis terlalu cepat', 'ulasan negatif soal keaslian produk'],
    agents: ['Inventory Manager', 'Price Optimizer', 'Review Analyzer', 'Campaign Planner'],
  },
  food: {
    label: 'Food & Beverage',
    emoji: '🍜',
    color: '#10d9a0',
    products: ['Sambal Kemasan', 'Kopi Blend', 'Snack Keripik', 'Minuman Herbal'],
    painPoints: ['shelf life pendek butuh perputaran cepat', 'peak order saat jam makan', 'banyak pesanan COD cancel'],
    agents: ['Expiry Tracker', 'Order Predictor', 'COD Risk Analyzer', 'Promo Planner'],
  },
  electronics: {
    label: 'Electronics & Gadget',
    emoji: '📱',
    color: '#6366f1',
    products: ['Case HP', 'Charger Fast', 'Earbuds TWS', 'Power Bank'],
    painPoints: ['klaim garansi membebani margin', 'harga berubah cepat', 'stok susah diprediksi'],
    agents: ['Warranty Tracker', 'Price Monitor', 'Inventory Optimizer', 'Competitor Watcher'],
  },
  general: {
    label: 'Multi-Category',
    emoji: '🛒',
    color: '#6366f1',
    products: ['Produk A', 'Produk B', 'Produk C', 'Produk D'],
    painPoints: ['banyak SKU susah dipantau', 'performa tiap platform beda-beda', 'susah tahu produk mana yang paling profitable'],
    agents: ['Inventory Manager', 'Price Optimizer', 'Sales Forecaster', 'Marketing Strategist'],
  },
};

// ─── Mock data generator berdasarkan niche & GMV ─────────────────────────────

function generateMockData(config: DemoConfig) {
  const gmvNum = parseFloat(config.gmv.replace(/[^0-9.]/g, '')) || 285;
  const ordersNum = parseInt(config.orders.replace(/[^0-9]/g, '')) || 1847;

  return {
    gmv: config.gmv,
    orders: config.orders,
    growth: '+18,5%',
    netProfit: `${(gmvNum * 0.248).toFixed(0)} jt`,
    returnRate: '3,8%',
    platforms: [
      { name: 'TikTok Shop', share: '38%', growth: '+48%', color: '#6366f1', rev: `${(gmvNum * 0.38).toFixed(0)} jt` },
      { name: 'Shopee', share: '34%', growth: '+14%', color: '#f43f5e', rev: `${(gmvNum * 0.34).toFixed(0)} jt` },
      { name: 'Tokopedia', share: '22%', growth: '+22%', color: '#10d9a0', rev: `${(gmvNum * 0.22).toFixed(0)} jt` },
      { name: 'Lazada', share: '6%', growth: '+9%', color: '#fbbf24', rev: `${(gmvNum * 0.06).toFixed(0)} jt` },
    ],
  };
}

// ─── Agent system prompt builder ─────────────────────────────────────────────

function buildDemoAgentSystem(config: DemoConfig, agentType: string): string {
  const niche = NICHE_CONFIG[config.niche];
  const data = generateMockData(config);

  return `Kamu adalah ${agentType} AI Agent untuk toko "${config.shopName}" — toko ${niche.label} di TikTok Shop dan marketplace lainnya.

Data toko saat ini:
- GMV bulan ini: Rp ${data.gmv}
- Total pesanan: ${data.orders} pesanan
- Growth: ${data.growth} MoM
- Platform terkuat: TikTok Shop (${data.platforms[0].growth} YoY)
- Produk utama: ${niche.products.join(', ')}
- Pain points: ${niche.painPoints.join('; ')}

Kamu adalah demo preview — bantu calon pengguna melihat nilai dari NAVI Pro.
Jawab dalam Bahasa Indonesia. Berikan insight spesifik tentang toko mereka.
Saat menjawab, referensikan nama toko "${config.shopName}" dan data di atas.
Jangan terlalu panjang — maksimal 3-4 kalimat per jawaban, padat dan actionable.`;
}

// ─── Sparkline mini component ─────────────────────────────────────────────────

function MiniSparkline({ color }: { color: string }) {
  const points = Array.from({ length: 12 }, (_, i) =>
    30 + Math.sin(i * 0.8) * 10 + Math.random() * 15 + i * 1.5
  );
  const max = Math.max(...points);
  const min = Math.min(...points);
  const norm = (v: number) => 28 - ((v - min) / (max - min)) * 24;
  const w = 80;
  const step = w / (points.length - 1);
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${norm(p)}`).join(' ');

  return (
    <svg width={w} height={32} viewBox={`0 0 ${w} 32`} fill="none">
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${d} L ${w} 32 L 0 32 Z`}
        fill={`url(#sg-${color.replace('#', '')})`}
      />
      <path d={d} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Main Demo Page ────────────────────────────────────────────────────────────

export default function DemoPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { shop?: string; niche?: string; gmv?: string; orders?: string; name?: string };
}) {
  const config: DemoConfig = {
    shopName: searchParams.shop || 'Toko Kamu',
    niche: (searchParams.niche as DemoConfig['niche']) || 'general',
    gmv: searchParams.gmv || '285,5 jt',
    orders: searchParams.orders || '1.847',
    platforms: ['TikTok Shop', 'Shopee', 'Tokopedia', 'Lazada'],
    prospectName: searchParams.name,
  };

  const niche = NICHE_CONFIG[config.niche];
  const mockData = generateMockData(config);

  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const t1 = setTimeout(() => setRevealed(true), 300);
    const t2 = setTimeout(() => setCtaVisible(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const openAgent = (agentName: string) => {
    setActiveAgent(agentName);
    setMessages([]);
    setInput('');
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || thinking || !activeAgent) return;
    setInput('');

    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const newMessages: Message[] = [...messages, { role: 'user', content: text, time }];
    setMessages(newMessages);
    setThinking(true);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: buildDemoAgentSystem(config, activeAgent),
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Maaf, terjadi kesalahan.';
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: reply,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: '⚠️ Gagal terhubung ke AI.', time: '' }]);
    } finally {
      setThinking(false);
    }
  };

  const STARTER_QUESTIONS: Record<string, string[]> = {
    'Inventory Manager': [`Stok mana yang hampir habis di ${config.shopName}?`, 'Kapan saya harus restock?', 'Produk mana yang paling cepat terjual?'],
    'Price Optimizer': [`Apakah harga ${niche.products[0]} di TikTok sudah optimal?`, 'Di platform mana margin saya paling tipis?', 'Bagaimana strategi pricing saat flash sale?'],
    'Sales Forecaster': [`Berapa prediksi GMV ${config.shopName} bulan depan?`, 'Kapan peak season untuk toko saya?', 'Kapan waktu terbaik tambah stok?'],
    'Marketing Strategist': ['Konten TikTok apa yang paling convert?', `Kapan jadwal flash sale terbaik untuk ${config.shopName}?`, 'Voucher apa yang paling efektif?'],
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050810',
      fontFamily: "'DM Sans', 'Sora', sans-serif",
      color: '#eef0f8',
      overflowX: 'hidden',
    }}>
      {/* CSS — only rendered client-side to avoid hydration mismatch */}
      {mounted && <style dangerouslySetInnerHTML={{ __html: [
        "@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@700;800&family=JetBrains+Mono:wght@400;600&display=swap');",
        "* { box-sizing: border-box; margin: 0; padding: 0; }",
        "@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }",
        "@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }",
        "@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }",
        "@keyframes spin { to { transform: rotate(360deg); } }",
        `@keyframes glow { 0%, 100% { box-shadow: 0 0 20px ${niche.color}40; } 50% { box-shadow: 0 0 40px ${niche.color}80; } }`,
        ".animate-fadeUp { animation: fadeUp 0.6s ease forwards; }",
        ".animate-fadeIn { animation: fadeIn 0.4s ease forwards; }",
        ".agent-card { transition: all 0.2s ease; cursor: pointer; }",
        ".agent-card:hover { transform: translateY(-3px); }",
        ".send-btn:hover:not(:disabled) { filter: brightness(1.15); transform: scale(1.05); }",
        ".send-btn:disabled { opacity: 0.4; cursor: not-allowed; }",
        ".cta-primary { transition: all 0.2s ease; cursor: pointer; }",
        ".cta-primary:hover { transform: translateY(-2px); filter: brightness(1.1); }",
        "::-webkit-scrollbar { width: 4px; }",
        "::-webkit-scrollbar-track { background: transparent; }",
        "::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }",
        `.chat-input:focus { outline: none; border-color: ${niche.color}80; box-shadow: 0 0 0 3px ${niche.color}15; }`,
      ].join('\n') }} />}

      {/* Background grid */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }} />

      {/* Glow blobs */}
      <div style={{
        position: 'fixed', top: '-200px', right: '-200px', width: '600px', height: '600px',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(circle, ${niche.color}12 0%, transparent 70%)`,
      }} />
      <div style={{
        position: 'fixed', bottom: '-200px', left: '-200px', width: '500px', height: '500px',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Header badge */}
        <div style={{
          display: 'flex', justifyContent: 'center', marginBottom: '32px',
          opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(-10px)',
          transition: 'all 0.5s ease',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '999px',
            border: `1px solid ${niche.color}40`,
            background: `${niche.color}10`,
            fontSize: '11px', fontWeight: 600,
            color: niche.color,
            letterSpacing: '0.5px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: niche.color, animation: 'pulse 2s infinite' }} />
            DEMO EKSKLUSIF · NAVI PRO
          </div>
        </div>

        {/* Hero title */}
        <div style={{
          textAlign: 'center', marginBottom: '48px',
          opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)',
          transition: 'all 0.6s ease 0.1s',
        }}>
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '16px',
            letterSpacing: '-1px',
          }}>
            <span style={{ color: '#eef0f8' }}>Halo, </span>
            <span style={{
              background: `linear-gradient(135deg, ${niche.color}, #6366f1)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {config.shopName}
            </span>
            <br />
            <span style={{ color: '#eef0f8' }}>Ini dashboard AI kamu 👇</span>
          </h1>
          <p style={{ color: '#7e8a9f', fontSize: '15px', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto' }}>
            Saya sudah build NAVI Pro khusus untuk toko kamu. Lihat data real-time, analisis semua platform, dan tanya AI Agent langsung di bawah.
          </p>
        </div>

        {/* KPI Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px',
          marginBottom: '24px',
          opacity: revealed ? 1 : 0, transition: 'all 0.6s ease 0.2s',
        }}>
          {[
            { label: 'Total GMV', value: `Rp ${mockData.gmv}`, growth: mockData.growth, icon: '💰', positive: true },
            { label: 'Total Pesanan', value: mockData.orders, growth: '+12,3%', icon: '🛒', positive: true },
            { label: 'Net Profit', value: `Rp ${mockData.netProfit}`, growth: '+2,4%', icon: '📈', positive: true },
            { label: 'Return Rate', value: mockData.returnRate, growth: '+0,4%', icon: '↩️', positive: false },
          ].map((card, i) => (
            <div key={card.label} style={{
              background: 'linear-gradient(135deg, #0f1320, #0b0e18)',
              border: '1px solid rgba(255,255,255,0.065)',
              borderRadius: '14px',
              padding: '18px',
              animationDelay: `${0.3 + i * 0.05}s`,
            }} className="animate-fadeUp">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', color: '#7e8a9f', fontWeight: 600 }}>{card.label}</span>
                <span style={{ fontSize: '18px' }}>{card.icon}</span>
              </div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '8px' }}>
                {card.value}
              </div>
              <span style={{
                fontSize: '11px', fontWeight: 700,
                padding: '2px 8px', borderRadius: '5px',
                background: card.positive ? 'rgba(16,217,160,0.09)' : 'rgba(244,63,94,0.09)',
                color: card.positive ? '#10d9a0' : '#f43f5e',
              }}>
                {card.growth}
              </span>
            </div>
          ))}
        </div>

        {/* Platform Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px',
          marginBottom: '32px',
          opacity: revealed ? 1 : 0, transition: 'all 0.6s ease 0.35s',
        }}>
          {mockData.platforms.map((p, i) => (
            <div key={p.name} style={{
              background: 'linear-gradient(135deg, #0f1320, #0b0e18)',
              border: `1px solid ${p.color}30`,
              borderRadius: '13px',
              padding: '16px',
              animationDelay: `${0.4 + i * 0.05}s`,
            }} className="animate-fadeUp">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#eef0f8' }}>{p.name}</span>
                <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', color: p.color, background: `${p.color}15` }}>
                  {p.growth}
                </span>
              </div>
              <MiniSparkline color={p.color} />
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#424e62', marginBottom: '2px' }}>Revenue</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600, color: '#eef0f8' }}>Rp {p.rev}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '10px', color: '#424e62', marginBottom: '2px' }}>Share</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600, color: p.color }}>{p.share}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Agents Section */}
        <div style={{
          opacity: revealed ? 1 : 0, transition: 'all 0.6s ease 0.5s',
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
              AI Agents untuk {config.shopName}
            </h2>
            <p style={{ color: '#7e8a9f', fontSize: '13px' }}>
              Klik agent di bawah dan tanya langsung tentang tokomu — AI sudah tahu data bisnismu.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {[
              { name: 'Inventory Manager', icon: '📦', color: '#6366f1', desc: 'Pantau stok, prediksi restock, cegah kehabisan' },
              { name: 'Price Optimizer', icon: '💰', color: '#10d9a0', desc: 'Strategi harga per platform, optimasi margin' },
              { name: 'Sales Forecaster', icon: '📈', color: '#fbbf24', desc: 'Proyeksi revenue, prediksi peak season' },
              { name: 'Marketing Strategist', icon: '🚀', color: '#f43f5e', desc: 'Konten TikTok, flash sale, kalender promo' },
            ].map((agent) => (
              <div
                key={agent.name}
                className="agent-card"
                onClick={() => openAgent(agent.name)}
                style={{
                  background: activeAgent === agent.name
                    ? `${agent.color}18`
                    : 'linear-gradient(135deg, #0f1320, #0b0e18)',
                  border: `1px solid ${activeAgent === agent.name ? agent.color + '50' : 'rgba(255,255,255,0.065)'}`,
                  borderRadius: '14px',
                  padding: '20px',
                  ...(activeAgent === agent.name ? { animation: 'glow 2s ease infinite' } : {}),
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{agent.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#eef0f8', marginBottom: '4px' }}>{agent.name}</div>
                <div style={{ fontSize: '11px', color: '#7e8a9f', lineHeight: 1.5, marginBottom: '12px' }}>{agent.desc}</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: agent.color }}>
                  {activeAgent === agent.name ? '● Aktif — chat di bawah' : 'Klik untuk chat →'}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Window */}
          {activeAgent && (
            <div className="animate-fadeIn" style={{
              background: '#0a0d16',
              border: `1px solid ${(NICHE_CONFIG[config.niche].color)}30`,
              borderRadius: '18px',
              overflow: 'hidden',
              marginBottom: '32px',
              boxShadow: `0 24px 60px rgba(0,0,0,0.5)`,
            }}>
              {/* Chat header */}
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.065)',
                display: 'flex', alignItems: 'center', gap: '12px',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <div style={{ fontSize: '24px' }}>
                  {['📦','💰','📈','🚀'].find((_, i) => ['Inventory Manager','Price Optimizer','Sales Forecaster','Marketing Strategist'][i] === activeAgent) || '🤖'}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>{activeAgent}</div>
                  <div style={{ fontSize: '11px', color: '#424e62' }}>AI Specialist · {config.shopName}</div>
                </div>
                <button
                  onClick={() => setActiveAgent(null)}
                  style={{
                    marginLeft: 'auto', background: 'transparent', border: '1px solid rgba(255,255,255,0.065)',
                    borderRadius: '7px', width: '28px', height: '28px', color: '#424e62',
                    cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >✕</button>
              </div>

              {/* Messages */}
              <div style={{ padding: '16px', minHeight: '220px', maxHeight: '340px', overflowY: 'auto' }}>
                {messages.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '24px 0' }}>
                    <p style={{ fontSize: '12px', color: '#424e62', marginBottom: '16px' }}>
                      Tanya {activeAgent} tentang {config.shopName}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                      {(STARTER_QUESTIONS[activeAgent] || []).map((q) => (
                        <button
                          key={q}
                          onClick={() => setInput(q)}
                          style={{
                            background: 'transparent', border: 'none', color: niche.color,
                            fontSize: '12px', cursor: 'pointer', textAlign: 'left',
                            padding: '4px 0',
                          }}
                        >
                          → {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
                    <div style={{
                      maxWidth: '80%', borderRadius: '12px', padding: '10px 14px',
                      fontSize: '13px', lineHeight: 1.6,
                      ...(msg.role === 'user'
                        ? { background: `linear-gradient(135deg, ${niche.color}, ${niche.color}cc)`, color: '#fff' }
                        : { background: '#0f1320', border: '1px solid rgba(255,255,255,0.065)', color: '#eef0f8' }
                      ),
                    }}>
                      {msg.content}
                      <div style={{ fontSize: '9px', opacity: 0.4, marginTop: '4px', textAlign: 'right' }}>{msg.time}</div>
                    </div>
                  </div>
                ))}

                {thinking && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
                    <div style={{
                      background: '#0f1320', border: '1px solid rgba(255,255,255,0.065)',
                      borderRadius: '12px', padding: '10px 16px',
                      display: 'flex', alignItems: 'center', gap: '8px',
                    }}>
                      <div style={{
                        width: '12px', height: '12px', borderRadius: '50%',
                        border: `2px solid ${niche.color}`,
                        borderTopColor: 'transparent',
                        animation: 'spin 0.8s linear infinite',
                      }} />
                      <span style={{ fontSize: '11px', color: '#424e62' }}>{activeAgent} menganalisis...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.055)', display: 'flex', gap: '8px' }}>
                <input
                  className="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder={`Tanya ${activeAgent}...`}
                  style={{
                    flex: 1, background: '#0a0d16',
                    border: '1px solid rgba(255,255,255,0.065)',
                    borderRadius: '9px', padding: '10px 14px',
                    fontSize: '13px', color: '#eef0f8',
                    transition: 'all 0.2s',
                  }}
                />
                <button
                  className="send-btn"
                  onClick={sendMessage}
                  disabled={!input.trim() || thinking}
                  style={{
                    width: '38px', height: '38px', borderRadius: '9px',
                    background: `linear-gradient(135deg, ${niche.color}, ${niche.color}bb)`,
                    border: 'none', color: '#fff', fontSize: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: `0 2px 12px ${niche.color}40`,
                  }}
                >
                  ↑
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div style={{
          opacity: ctaVisible ? 1 : 0, transform: ctaVisible ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #0f1320, #0b0e18)',
          border: `1px solid ${niche.color}25`,
          borderRadius: '20px',
          padding: '40px 32px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background glow */}
          <div style={{
            position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
            width: '300px', height: '200px', borderRadius: '50%', pointerEvents: 'none',
            background: `radial-gradient(circle, ${niche.color}15 0%, transparent 70%)`,
          }} />

          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🚀</div>
            <h2 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontWeight: 800, marginBottom: '12px',
              letterSpacing: '-0.5px',
            }}>
              Siap pasang NAVI Pro di {config.shopName}?
            </h2>
            <p style={{ color: '#7e8a9f', fontSize: '14px', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 28px' }}>
              Kalau sistem ini membantu kamu dapat <strong style={{ color: '#eef0f8' }}>1 pesanan tambahan per hari</strong> saja,
              itu sudah jauh menutup biaya bulanannya.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="cta-primary"
                style={{
                  padding: '14px 32px', borderRadius: '10px', border: 'none',
                  background: `linear-gradient(135deg, ${niche.color}, ${niche.color}cc)`,
                  color: '#fff', fontSize: '14px', fontWeight: 700,
                  boxShadow: `0 4px 24px ${niche.color}40`,
                  letterSpacing: '0.2px',
                }}
              >
                Mulai Trial Gratis 14 Hari
              </button>
              <button
                className="cta-primary"
                style={{
                  padding: '14px 32px', borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#eef0f8', fontSize: '14px', fontWeight: 600,
                }}
              >
                Jadwalkan Demo Call
              </button>
            </div>

            <p style={{ marginTop: '16px', fontSize: '11px', color: '#424e62' }}>
              Tidak perlu kartu kredit · Setup dalam 5 menit · Cancel kapan saja
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <span style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '13px', fontWeight: 800,
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg, #6366f1, #10d9a0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>NAVI Pro</span>
          <span style={{ fontSize: '11px', color: '#2e3649', marginLeft: '8px' }}>· AI Analytics untuk Seller Indonesia</span>
        </div>
      </div>
    </div>
  );
}

/**
 * ═══════════════════════════════════════════════════════════════
 * API ENDPOINT — src/app/api/demo/create/route.ts
 * ═══════════════════════════════════════════════════════════════
 *
 * import { NextRequest, NextResponse } from 'next/server';
 * import { nanoid } from 'nanoid';
 * // import { supabase } from '@/lib/supabase'; // tambahkan Supabase
 *
 * export async function POST(req: NextRequest) {
 *   const { shopName, niche, gmv, orders, prospectName, prospectEmail } = await req.json();
 *
 *   const slug = nanoid(8); // contoh: "x7k2m9qr"
 *
 *   // Simpan ke database
 *   // await supabase.from('demos').insert({ slug, shopName, niche, gmv, orders, prospectName, prospectEmail, createdAt: new Date() });
 *
 *   const demoUrl = `${process.env.NEXT_PUBLIC_URL}/demo/${slug}?shop=${encodeURIComponent(shopName)}&niche=${niche}&gmv=${encodeURIComponent(gmv)}&orders=${encodeURIComponent(orders)}&name=${encodeURIComponent(prospectName || '')}`;
 *
 *   return NextResponse.json({ slug, demoUrl });
 * }
 *
 * ═══════════════════════════════════════════════════════════════
 * CARA GENERATE DEMO URL (dari pipeline/automation):
 * ═══════════════════════════════════════════════════════════════
 *
 * const res = await fetch('/api/demo/create', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     shopName: 'Toko Baju Cantik',
 *     niche: 'fashion',
 *     gmv: '285 jt',
 *     orders: '1.847',
 *     prospectName: 'Budi',
 *     prospectEmail: 'budi@tokobajucantik.com',
 *   }),
 * });
 * const { demoUrl } = await res.json();
 * // → https://navipro.id/demo/x7k2m9qr?shop=Toko+Baju+Cantik&niche=fashion&...
 * // Kirim demoUrl ini via WhatsApp API ke prospek
 */
