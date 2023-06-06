import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";

export default function InfoAreaChart() {
  const { carStatsForChart } = chartStatisticHook();
  return (
    <ResponsiveContainer width="99%">
      <AreaChart data={carStatsForChart}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area dataKey="vehicles" stroke="#2451B7" fill="url(#color)" />
        <XAxis dataKey="date" axisLine={false} tickLine={false} />

        <YAxis
          dataKey="vehicles"
          axisLine={false}
          tickLine={false}
          tickCount={8}
        />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" opacity={1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
