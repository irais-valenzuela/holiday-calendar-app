import styled from "styled-components";
import { MONTH_ARRAY, MONTH_NUMBER } from "../constants";

const Select = styled.select`
  height: 40px;
  width: 160px;
  font-size: 20px;
  margin-bottom: 17px;
  border-radius: 10px;
`;

interface Props {
  selectedMonth: string;
  setSelectedMonth: (value: string) => void;
  setMonthIdx: (value: number) => void;
}

const MonthDropdown = ({
  selectedMonth,
  setSelectedMonth,
  setMonthIdx,
}: Props) => {
  const handleChange = (e: any): void => {
    setSelectedMonth(e.target.value);
    setMonthIdx(MONTH_NUMBER[e.target.value]);
  };

  return (
    <Select value={selectedMonth} onChange={handleChange}>
      {MONTH_ARRAY.map((month, i) => (
        <option key={i} value={month}>
          {month}
        </option>
      ))}
    </Select>
  );
};

export default MonthDropdown;
