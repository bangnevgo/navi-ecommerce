// ── Period Data — NAVI Pro ──

export type Period = '7 Hari' | 'Minggu' | 'Bulan' | 'Tahun';

export interface PlatformData {
  name: string;
  rev: string;
  orders: number;
  share: string;
  growth: string;
}

export interface PeriodData {
  days: number;
  gmv: string;
  pesanan: string;
  netProfit: string;
  returnRate: string;
  gmvSub: string;
  profitSub: string;
  gmvGrowth: string;
  pesananGrowth: string;
  netGrowth: string;
  returnChange: string;
  platforms: PlatformData[];
}

export const periodData: Record<Period, PeriodData> = {
  '7 Hari': {
    days: 7,
    gmv: '67,2 jt', pesanan: '432', netProfit: '16,6 jt', returnRate: '3,2',
    gmvSub: '4 platform · 432 pesanan', profitSub: 'Margin 24,7% · setelah biaya',
    gmvGrowth: '+22%', pesananGrowth: '+15%', netGrowth: '+3,1%', returnChange: '+0,2%',
    platforms: [
      { name: 'Tokopedia', rev: '30 jt',  orders: 195, share: '44%', growth: '+25%' },
      { name: 'Shopee',    rev: '23 jt',  orders: 155, share: '34%', growth: '+16%' },
      { name: 'TikTok',   rev: '11 jt',  orders: 58,  share: '16%', growth: '+38%' },
      { name: 'Lazada',   rev: '4,2 jt', orders: 24,  share: '6%',  growth: '+9%'  },
    ],
  },
  'Minggu': {
    days: 14,
    gmv: '139,5 jt', pesanan: '920', netProfit: '34,5 jt', returnRate: '3,6',
    gmvSub: '4 platform · 920 pesanan', profitSub: 'Margin 24,7% · setelah biaya',
    gmvGrowth: '+19%', pesananGrowth: '+13%', netGrowth: '+2,8%', returnChange: '+0,3%',
    platforms: [
      { name: 'Tokopedia', rev: '61 jt',  orders: 402, share: '44%', growth: '+23%' },
      { name: 'Shopee',    rev: '47 jt',  orders: 315, share: '34%', growth: '+15%' },
      { name: 'TikTok',   rev: '22 jt',  orders: 140, share: '16%', growth: '+36%' },
      { name: 'Lazada',   rev: '9,5 jt', orders: 63,  share: '6%',  growth: '+8%'  },
    ],
  },
  'Bulan': {
    days: 30,
    gmv: '285,5 jt', pesanan: '1.847', netProfit: '70,8 jt', returnRate: '3,8',
    gmvSub: '4 platform · 1.847 pesanan', profitSub: 'Margin 24,8% · setelah biaya',
    gmvGrowth: '+18,5%', pesananGrowth: '+12,3%', netGrowth: '+2,4%', returnChange: '+0,4%',
    platforms: [
      { name: 'Tokopedia', rev: '125 jt',  orders: 812,  share: '44%', growth: '+22%' },
      { name: 'Shopee',    rev: '98 jt',   orders: 645,  share: '34%', growth: '+14%' },
      { name: 'TikTok',   rev: '45 jt',   orders: 287,  share: '16%', growth: '+35%' },
      { name: 'Lazada',   rev: '17,5 jt', orders: 103,  share: '6%',  growth: '+8%'  },
    ],
  },
  'Tahun': {
    days: 365,
    gmv: '3,12 M', pesanan: '21.840', netProfit: '779 jt', returnRate: '3,9',
    gmvSub: '4 platform · 21.840 pesanan', profitSub: 'Margin 25,0% · setelah biaya',
    gmvGrowth: '+31%', pesananGrowth: '+24%', netGrowth: '+8,7%', returnChange: '+0,6%',
    platforms: [
      { name: 'Tokopedia', rev: '1,37 M', orders: 9500, share: '44%', growth: '+29%' },
      { name: 'Shopee',    rev: '1,06 M', orders: 7600, share: '34%', growth: '+22%' },
      { name: 'TikTok',   rev: '493 jt', orders: 3400, share: '16%', growth: '+48%' },
      { name: 'Lazada',   rev: '191 jt', orders: 1340, share: '6%',  growth: '+12%' },
    ],
  },
};
