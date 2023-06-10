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
import "./styles.css";
import { curveCardinal } from "d3-shape";
import { useEffect } from "react";
import { AxisInterval } from "recharts/types/util/types";

export default function InfoAreaChart() {
  const { carStatsForChart } = chartStatisticHook();
  const interval: AxisInterval = "equidistantPreserveStart" as AxisInterval;
  return (
    <div className="info-area-chart-container">
      <ResponsiveContainer>
        <AreaChart
          data={carStatsForChart}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area dataKey="vehicles" stroke="#2451B7" fill="url(#color)" />

          <XAxis
            dataKey="date"
            angle={-5}
            allowDataOverflow={false}
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            interval={interval}
          />

          <YAxis
            dataKey="vehicles"
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tickCount={8}
          />

          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" opacity={1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
