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

const styles = {};

const Barchart = ({
  data,
}: {
  data: {
    name: string;
    uv: number;
    pv: number;
    amt: number;
  }[];
}) => {
  return (
    <ResponsiveContainer>
      <BarChart data={data} style={styles}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#82ca9d" />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="amt" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
