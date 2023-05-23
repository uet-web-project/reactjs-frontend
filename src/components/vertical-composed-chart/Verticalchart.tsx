import React, { useEffect } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer,
} from "recharts";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";

export default function Verticalchart() {
  const { loading, carTypeOverviewChart, getDataForCarTypeOverview } =
    chartStatisticHook();

  useEffect(() => {
    getDataForCarTypeOverview("week");
  }, []);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        layout="vertical"
        data={carTypeOverviewChart}
        margin={{
          top: 20,
          right: 20,
          bottom: 10,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="vehicleType" type="category" scale="band" />
        <Tooltip />
        <Legend />
        <Bar dataKey="vehicles" barSize={40} fill="#62b7d3" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
