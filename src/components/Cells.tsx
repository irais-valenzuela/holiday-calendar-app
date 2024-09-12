import { DAYS_OF_WEEK, DAYS_IN_MONTH } from "../constants";
import styled from "styled-components";

interface Props {
  selectedMonth: string;
  monthIdx: number;
  svHolidays: { [key: number]: { [key: number]: string[] } };
  usHolidays: { [key: number]: { [key: number]: string[] } };
  setShowModal: (value: boolean) => void;
}

const CellContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 200px);
  grid-template-rows: 40px repeat(6, 150px);
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

const handleClick = ( setShowModal: (value: boolean) => void) => {
  setShowModal(true)
}

const Cells = ({
  selectedMonth,
  monthIdx,
  svHolidays,
  usHolidays,
  setShowModal
}: Props): JSX.Element => {
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
 
        <Cell $cellType="regular" onClick={() => handleClick(setShowModal)}>
          {dateNumber}
          <br />
          {Object.keys(svHolidays).length &&
          svHolidays[monthIdx + 1]?.[dateNumber]?.length
            ? svHolidays[monthIdx + 1][dateNumber].map((holiday, index) => (
                <div key={index} className="sv">
                  {holiday}
                </div>
              ))
            : ""}
          {Object.keys(usHolidays).length &&
          usHolidays[monthIdx + 1]?.[dateNumber]?.length
            ? usHolidays[monthIdx + 1][dateNumber].map((holiday, index) => {
                return (
                  <div key={index} className="us">
                    {holiday}
                  </div>
                );
              })
            : ""}
        </Cell>
      );
      dateNumber += 1;

    }
  }
  return <CellContainer>{cellCollection}</CellContainer>;
};

export default Cells;
