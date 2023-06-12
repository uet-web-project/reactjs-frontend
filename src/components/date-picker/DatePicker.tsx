import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./styles.css";
import subDays from "date-fns/subDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";
import { useEffect, useState } from "react";
import { RangeType } from "rsuite/esm/DateRangePicker";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";
import { loadingHook } from "../../redux/hooks/loadingHooks";

const today = new Date();
const pastMonthStart = startOfMonth(addMonths(today, 0));

const predefinedRanges = [
  {
    label: "This week",
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
    placement: "left",
  },
  {
    label: "Last 7 days",
    value: [subDays(new Date(), 6), new Date()],
    placement: "left",
  },
  {
    label: "Last 30 days",
    value: [subDays(new Date(), 29), new Date()],
    placement: "left",
  },
  {
    label: "Last 90 days",
    value: [subDays(new Date(), 89), new Date()],
    placement: "left",
  },
  {
    label: "This month",
    value: [startOfMonth(new Date()), new Date()],
    placement: "left",
  },
  {
    label: "Last month",
    value: [
      startOfMonth(addMonths(new Date(), -1)),
      endOfMonth(addMonths(new Date(), -1)),
    ],
    placement: "left",
  },
  {
    label: "This year",
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: "left",
  },
  {
    label: "Last year",
    value: [
      new Date(new Date().getFullYear() - 1, 0, 1),
      new Date(new Date().getFullYear(), 0, 1),
    ],
    placement: "left",
  },
  {
    label: "Last 5 years",
    value: [
      new Date(new Date().getFullYear() - 5, 0, 1),
      new Date(new Date().getFullYear(), 0, 1),
    ],
    placement: "left",
  },
  {
    label: "All time",
    value: [new Date(new Date().getFullYear() - 20, 0, 1), new Date()],
    placement: "left",
  },
];
export default function DatePicker() {
  const { infoChartController, getDataForCarPieChart } = chartStatisticHook();
  const { setDateState } = loadingHook();
  const [value, setValue] = useState([pastMonthStart, today]);
  useEffect(() => {
    infoChartController();
    getDataForCarPieChart();
  }, [value]);

  const handleDateRangeChange = (
    value: [Date, Date] | null,
    event: React.SyntheticEvent<Element, Event>
  ) => {
    if (value !== null) {
      const dateStart = value[0].toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const formattedDateStart = dateStart.replace(
        /(\d+)\/(\d+)\/(\d+)/,
        "$3-$2-$1"
      );
      const dateEnd = value[1].toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const formattedDateEnd = dateEnd.replace(
        /(\d+)\/(\d+)\/(\d+)/,
        "$3-$2-$1"
      );
      setDateState([formattedDateStart, formattedDateEnd]);
      setValue(value as [Date, Date]);
    }
  };

  return (
    <DateRangePicker
      placement="auto"
      className="custom-date-picker"
      value={value as [Date, Date]}
      ranges={predefinedRanges as RangeType[]}
      placeholder="Placement left"
      onChange={handleDateRangeChange}
      style={{ color: "black !important" }}
    />
  );
}
