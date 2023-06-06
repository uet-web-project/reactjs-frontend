import React, { CSSProperties, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Sector,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";

const current = new Date();
const currentMonth = current.toLocaleString("default", { month: "long" });
current.setMonth(current.getMonth() - 1);
const previousMonth = current.toLocaleString("default", { month: "long" });

const CarPieChart = () => {
  const { carRegisteredMonthlyComparison, getDataForMonthlyComparison } =
    chartStatisticHook();

  useEffect(() => {
    getDataForMonthlyComparison()
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="pie-chart-container" style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer>
        <PieChart className="pie-chart">
          <Legend
            className="legend-pie"
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
            wrapperStyle={{
              position: "absolute",
              right: "30px",
              top: "190px",
            }}
            align="center"
            verticalAlign="bottom"
            layout="horizontal"
          />

          <Pie
            data={carRegisteredMonthlyComparison}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {carRegisteredMonthlyComparison.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default CarPieChart;
