import { DAYS_OF_WEEK, DAYS_IN_MONTH } from "../constants";
import styled from "styled-components";

interface Props {
  selectedMonth: string;
  monthIdx: number;
  holidays: { [key: number]: string[][] };
}

const CellContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 200px);
  grid-template-rows: 40px 150px 150px 150px 150px 150px 150px;
`;

const Cell = styled.div<{ $cellType?: string }>`
  margin: 0px;
  border: solid black 1px;
  padding: 5px;
  background-color: ${(props) =>
    props.$cellType === "gray"
      ? "gray"
      : props.$cellType === "regular"
      ? ""
      : "rgb(255, 150, 150)"};
`;

const Cells = ({ selectedMonth, monthIdx, holidays }: Props): JSX.Element => {
  const cellCollection: JSX.Element[] = [];

  DAYS_OF_WEEK.forEach((day) => {
    cellCollection.push(<Cell $cellType="day">{day}</Cell>);
  });
  let startOfMonthDate;
  if (monthIdx >= 9) {
    startOfMonthDate = new Date(`2024-0${monthIdx + 1}-01`);
  } else {
    startOfMonthDate = new Date(`2024-${monthIdx + 1}-01`);
  }
  const startDate = startOfMonthDate.getDay();
  let dateNumber = 1;

  for (let i = 0; i <= 35; i++) {
    const totalDaysInMonth = DAYS_IN_MONTH[selectedMonth];
    if (i < startDate || dateNumber > totalDaysInMonth) {
      if (cellCollection.length - 7 === 35) {
        break;
      } else {
        cellCollection.push(<Cell $cellType="gray" />);
      }
    } else if (i >= startDate) {
      cellCollection.push(
        <Cell $cellType="regular">
          {dateNumber}
          {holidays[dateNumber] &&
            holidays[dateNumber][0].length > 0 &&
            holidays[dateNumber][0].map((name) => {
              return (
                <div className="sv" key={name}>
                  {name}
                </div>
              );
            })}
          {holidays[dateNumber] &&
            holidays[dateNumber][1].length > 0 &&
            holidays[dateNumber][1].map((name) => {
              return (
                <div className="us" key={name}>
                  {name}
                </div>
              );
            })}
        </Cell>
      );
      dateNumber += 1;
    }
  }
  return <CellContainer>{cellCollection}</CellContainer>;
};

export default Cells;
