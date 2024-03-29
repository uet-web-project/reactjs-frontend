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
import "./styles.css";
import { Payload } from "recharts/types/component/DefaultLegendContent";
const current = new Date();
const currentMonth = current.toLocaleString("default", { month: "long" });
current.setMonth(current.getMonth() - 1);
const previousMonth = current.toLocaleString("default", { month: "long" });

const CarPieChart = () => {
  const { carPieChart, getDataForCarPieChart } = chartStatisticHook();

  useEffect(() => {
    getDataForCarPieChart();
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
    <div className="car-pie-chart-container">
      <div
        style={{ textAlign: "center" }}
        className="monthly-average-text secondary-font"
      >
        Vehicle type distribution
      </div>
      <ResponsiveContainer>
        <PieChart className="pie-chart">
          <Legend
            className="legend-pie"
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
            wrapperStyle={{
              position: "absolute",
              right: "30px",
              top: "80%",
            }}
            align="center"
            verticalAlign="bottom"
            layout="horizontal"
            payload={carPieChart.map((item, index) => {
              const content: any = item;
              return {
                id: content.vehicles,
                type: "square",
                value: `${content.vehicleType}`,
                color: COLORS[index % COLORS.length],
              };
            })}
          />

          <Pie
            data={carPieChart}
            cx="50%"
            cy="40%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="vehicles"
          >
            {carPieChart.map((entry, index) => (
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
