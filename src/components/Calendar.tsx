import Cells from './Cells'
interface Props {
  selectedMonth: string;
  monthIdx: number;
  holidays: { [key: number]: string[][] };
}

const Calendar = ({
  selectedMonth,
  monthIdx,
  holidays,
}: Props): JSX.Element => {
  return (
    <div>
      <div className="el-salvador">El Salvador</div>
      <div className="united-states">United States</div>
      <Cells
        selectedMonth={selectedMonth}
        monthIdx={monthIdx}
        holidays={holidays}
      />
    </div>
  );
};

export default Calendar;
