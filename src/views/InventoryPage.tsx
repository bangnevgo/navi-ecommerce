'use client';
import { InventoryTable } from '@/components/table/InventoryTable';

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto">
      {/* Alert banner */}
      <div className="rounded-[12px] px-5 py-3.5 bg-[rgba(244,63,94,0.07)] border border-[rgba(244,63,94,0.2)] flex items-center gap-3">
        <span className="text-xl">⚠️</span>
        <div>
          <span className="text-[12.5px] font-bold text-[#f43f5e]">2 produk dalam kondisi kritis</span>
          <span className="text-[12px] text-[#7e8a9f] ml-2">Segera lakukan restock untuk menghindari kehabisan stok</span>
        </div>
      </div>
      <InventoryTable />
    </div>
  );
}
