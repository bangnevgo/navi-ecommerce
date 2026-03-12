// ── Claude API Service — NAVI Pro ──

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function callClaude(
  systemPrompt: string,
  messages: ClaudeMessage[],
  maxTokens = 1024
): Promise<string> {
  const res = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt, messages, maxTokens }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.content;
}

// Build dashboard context for NAVI main agent
export function buildDashboardContext(periodLabel: string, gmv: string, pesanan: string): string {
  return `Kamu adalah NAVI Agent — asisten AI untuk dashboard e-commerce analytics NAVI Pro.
Data dashboard saat ini (periode: ${periodLabel}):
- Total GMV: Rp ${gmv}
- Total Pesanan: ${pesanan}
- Platform aktif: Tokopedia, Shopee, TikTok Shop, Lazada
- Produk kritis: Kemeja Flanel Pria (stok 3 unit)
- Produk low stock: Blouse Kerja Premium (stok 12 unit)
Berikan analisis, insight, dan rekomendasi yang relevan berdasarkan pertanyaan pengguna.
Jawab dalam Bahasa Indonesia. Gunakan data di atas sebagai konteks.`;
}
