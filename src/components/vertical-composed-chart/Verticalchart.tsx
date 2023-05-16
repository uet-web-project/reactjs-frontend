import "./styles.css";
import React from "react";
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

const data = [
  {
    name: "Car",
    cars: 800,
  },
  {
    name: "Truck",
    cars: 967,
  },
  {
    name: "Bus",
    cars: 1098,
  },
  // {
  //   name: "Page D",
  //   pv: 1200,
  // },
  // {
  //   name: "Page E",
  //   pv: 1108,
  // },
  // {
  //   name: "Page F",
  //   pv: 680,
  // },
];

export default function Verticalchart({data}:{data:object[]}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        layout="vertical"
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 10,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number"/>
        <YAxis dataKey="name" type="category" scale="band" />
        <Tooltip />
        <Legend />
        <Bar dataKey="cars" barSize={40} fill="#62b7d3" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
