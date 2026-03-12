// ── Mock Products Data ──

export type StockStatus = 'ready' | 'low' | 'critical';

export interface Product {
  id: string;
  name: string;
  sku: string;
  platform: string;
  sold: number;
  revenue: string;
  stock: number;
  status: StockStatus;
}

export const mockProducts: Product[] = [
  { id: '1', name: 'Dress Casual Wanita - Navy', sku: 'DRS-NVY-001', platform: 'Tokopedia', sold: 234, revenue: 'Rp 28,5 jt', stock: 48, status: 'ready' },
  { id: '2', name: 'Blouse Kerja Premium',       sku: 'BLS-PRM-022', platform: 'Shopee',    sold: 198, revenue: 'Rp 21,7 jt', stock: 12, status: 'low'    },
  { id: '3', name: 'Celana Jeans Slim Fit',       sku: 'JNS-SLM-015', platform: 'TikTok Shop', sold: 187, revenue: 'Rp 18,9 jt', stock: 67, status: 'ready' },
  { id: '4', name: 'Kemeja Flanel Pria',          sku: 'KMJ-FLN-008', platform: 'Tokopedia', sold: 156, revenue: 'Rp 15,2 jt', stock: 3,  status: 'critical' },
  { id: '5', name: 'Rok Mini Trendy',             sku: 'ROK-MNI-041', platform: 'Shopee',    sold: 143, revenue: 'Rp 12,8 jt', stock: 89, status: 'ready' },
  { id: '6', name: 'Kaos Oversize Hitam',         sku: 'KOS-OVZ-019', platform: 'TikTok Shop', sold: 128, revenue: 'Rp 11,5 jt', stock: 22, status: 'low'  },
  { id: '7', name: 'Jaket Denim Klasik',          sku: 'JKT-DNM-033', platform: 'Lazada',    sold: 95,  revenue: 'Rp 9,8 jt',  stock: 34, status: 'ready' },
];

export interface InventoryItem {
  sku: string;
  name: string;
  currentStock: number;
  reorderPoint: number;
  maxStock: number;
  daysRemaining: string;
  status: StockStatus;
}

export const mockInventory: InventoryItem[] = [
  { sku: 'KMJ-FLN-008', name: 'Kemeja Flanel Pria',    currentStock: 3,  reorderPoint: 20, maxStock: 80,  daysRemaining: '1 hari',   status: 'critical' },
  { sku: 'BLS-PRM-022', name: 'Blouse Kerja Premium',  currentStock: 12, reorderPoint: 30, maxStock: 100, daysRemaining: '2 hari',   status: 'low'      },
  { sku: 'KOS-OVZ-019', name: 'Kaos Oversize Hitam',   currentStock: 22, reorderPoint: 60, maxStock: 80,  daysRemaining: '8 hari',   status: 'low'      },
  { sku: 'JKT-DNM-033', name: 'Jaket Denim Klasik',    currentStock: 34, reorderPoint: 40, maxStock: 80,  daysRemaining: '14 hari',  status: 'ready'    },
  { sku: 'DRS-NVY-001', name: 'Dress Casual Wanita',   currentStock: 48, reorderPoint: 40, maxStock: 100, daysRemaining: '22 hari',  status: 'ready'    },
  { sku: 'JNS-SLM-015', name: 'Celana Jeans Slim Fit', currentStock: 67, reorderPoint: 40, maxStock: 100, daysRemaining: '30+ hari', status: 'ready'    },
  { sku: 'ROK-MNI-041', name: 'Rok Mini Trendy',       currentStock: 89, reorderPoint: 40, maxStock: 120, daysRemaining: '30+ hari', status: 'ready'    },
];
