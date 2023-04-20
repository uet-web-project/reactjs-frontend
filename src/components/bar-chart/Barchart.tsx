import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", cars: 4000 },
  { name: "Feb", cars: 3000 },
  { name: "Mar", cars: 2000 },
  { name: "Apr", cars: 2780 },
  { name: "May", cars: 1890 },
  { name: "Jun", cars: 2390 },
  { name: "Jul", cars: 3490 },
];

const Barchart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          // label={{
          //   value: "The number of car expired base on car types",
          //   position: "bottom",
          //   offset: +16,
          // }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cars" fill="#62b7d3" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
