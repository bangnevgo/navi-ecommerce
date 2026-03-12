# NAVI Pro — React Component Library

E-Commerce Analytics Dashboard · Multi-platform (Tokopedia, Shopee, TikTok Shop, Lazada)

## Stack
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** — styling
- **Zustand** — global state
- **Chart.js** — semua chart (bar, sparkline)
- **Claude AI** — AI agents via Anthropic API

## Setup

```bash
# Install dependencies
npm install

# Copy env file
cp .env.example .env.local
# Edit .env.local — minimal: ANTHROPIC_API_KEY

# Dev server
npm run dev
```

Buka http://localhost:3000

## Struktur Folder

```
src/
├── app/                  # Next.js App Router
│   ├── api/ai/chat/      # Claude API route
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Entry point
├── components/
│   ├── ai/               # AIInsightPanel, AgentChatOverlay, AgentGrid
│   ├── charts/           # RevenueChart, Sparkline
│   ├── kpi/              # KpiCard, KpiRow
│   ├── platform/         # PlatformGrid
│   ├── sidebar/          # Sidebar, NavItem
│   ├── table/            # ProductsTable, InventoryTable
│   ├── topbar/           # Topbar, PeriodTabs
│   └── ui/               # Badge, Button, Spinner, Toast
├── data/                 # periodData, agentDefs, mockProducts
├── layouts/              # DashboardLayout
├── pages/                # Dashboard, PlatformPage, InventoryPage
├── services/             # claude.ts
├── store/                # Zustand stores
├── styles/               # tokens.css, animations.css
└── utils/                # format.ts, chartConfig.ts
```

## AI Agents

4 agen spesialis berbasis Claude:
- 📦 **Inventory Manager** — analisis stok, prediksi restock
- 💰 **Price Optimizer** — strategi harga per platform
- 📈 **Sales Forecaster** — proyeksi revenue, peak period
- 🚀 **Marketing Strategist** — kampanye, flash sale, konten TikTok

Butuh `ANTHROPIC_API_KEY` di `.env.local`.

## Notes

- Data mock tersedia di `src/data/` — ganti dengan API real saat production
- Untuk production: tambahkan NextAuth.js (auth) + Stripe (billing) + PostgreSQL (database)
- Lihat blueprint arsitektur di `NAVI_SaaS_Stack.jsx` untuk roadmap lengkap
