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

function Barchart({data}:{data:object[]}){
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cars" fill="#62b7d3" />
      </BarChart>
    </ResponsiveContainer>
  )
};

export default Barchart;
