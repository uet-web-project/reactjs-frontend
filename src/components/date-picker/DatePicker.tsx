import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./styles.css";
import { startOfDay, endOfDay, addDays, subDays } from "date-fns";
import addMonths from "date-fns/addMonths";

const today = new Date();
const Ranges = [
  {
    label: "today",
    value: [startOfDay(new Date()), endOfDay(new Date())],
  },
  {
    label: "yesterday",
    value: [
      startOfDay(addDays(new Date(), -1)),
      endOfDay(addDays(new Date(), -1)),
    ],
  },
  {
    label: "last7Days",
    value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())],
  },
  {
    label: "lastMonth",
    value: [startOfDay(subDays(new Date(), 30)), endOfDay(new Date())],
  },
  {
    label: "lastYear",
    value: [startOfDay(subDays(new Date(), 30)), endOfDay(new Date())],
  },
  
];
export default function DatePicker() {
  return (
    <>
      <DateRangePicker defaultCalendarValue={[addMonths(today, -1), today]} />
    </>
  );
}
