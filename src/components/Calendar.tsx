import Cells from "./Cells";
interface CalendarProps {
  selectedMonth: string;
  monthIdx: number;
  svHolidays: { [key: number]: {[key: number]: string[] }};
  usHolidays: { [key: number]: {[key: number]: string[] }};
  setShowModal: (value: boolean) => void;
}

const Calendar = ({
  selectedMonth,
  monthIdx,
  svHolidays,
  usHolidays,
  setShowModal,
}: CalendarProps): JSX.Element => {
  return (
    <div>
      <div className="el-salvador">El Salvador</div>
      <div className="united-states">United States</div>
      <Cells
        selectedMonth={selectedMonth}
        monthIdx={monthIdx}
        svHolidays={svHolidays}
        usHolidays={usHolidays}
        setShowModal={setShowModal}
      />
    </div>
  );
};



export default Calendar;
