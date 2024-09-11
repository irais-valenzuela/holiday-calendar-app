import Cells from "./Cells";
interface Props {
  selectedMonth: string;
  monthIdx: number;
  svHolidays: { [key: number]: {[key: number]: string[] }};
  usHolidays: { [key: number]: {[key: number]: string[] }};
}

const Calendar = ({
  selectedMonth,
  monthIdx,
  svHolidays,
  usHolidays
}: Props): JSX.Element => {
  return (
    <div>
      <div className="el-salvador">El Salvador</div>
      <div className="united-states">United States</div>
      <Cells
        selectedMonth={selectedMonth}
        monthIdx={monthIdx}
        svHolidays={svHolidays}
        usHolidays={usHolidays}
      />
    </div>
  );
};



export default Calendar;
