'use client';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { generateChartData } from '@/utils/format';

interface SparklineProps {
  color?: string;
  days?: number;
}

export function Sparkline({ color = '#818cf8', days = 14 }: SparklineProps) {
  const data = generateChartData(days).map((v, i) => ({ i, v }));

  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#sg-${color.replace('#','')})`}
          dot={false}
          isAnimationActive={false}
        />
        <Tooltip
          content={() => null}
          cursor={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
