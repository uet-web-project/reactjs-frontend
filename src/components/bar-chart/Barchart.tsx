import { useEffect } from "react";
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
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";
function Barchart() {
  const { totalOverviewChartData, getDataForTotalOverviewChart } =
    chartStatisticHook();

  useEffect(() => {
    getDataForTotalOverviewChart("week");
    console.log(totalOverviewChartData);
  }, []);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={totalOverviewChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={Object.keys(totalOverviewChartData[0])[1]} fill="#62b7d3" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Barchart;
