import { useState, useEffect } from "react";
import styled from "styled-components";
import { MonthDropdown, Calendar } from "./components";
import { MONTH_ARRAY, Holiday } from "./constants";

const Container = styled.div`
  margin: 32px;
`;

const CURRENT_DATE = new Date();
const CURRENT_MONTH_IDX = CURRENT_DATE.getMonth();
const CURRENT_MONTH = MONTH_ARRAY[CURRENT_MONTH_IDX];

function App() {
  const [selectedMonth, setSelectedMonth] = useState<string>(CURRENT_MONTH);
  const [monthIdx, setMonthIdx] = useState<number>(CURRENT_MONTH_IDX);
  const [holidays, setHolidays] = useState({});

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const data1 = await fetch(
          "https://date.nager.at/api/v3/publicholidays/2024/SV"
        );
        const data2 = await fetch(
          "https://date.nager.at/api/v3/publicholidays/2024/US"
        );
        if (!data1.ok && !data2.ok) {
          throw new Error("Network responses were not ok");
        } else {
          const sv = await data1.json();
          const us = await data2.json();
          const organizedHolidays = organizeCountryHolidayIntoObject(
            sv,
            us,
            monthIdx
          );
          setHolidays(organizedHolidays);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchHolidays();
  }, [selectedMonth, monthIdx]);

  return (
    <Container>
      <h1 className="center-text">{MONTH_ARRAY[monthIdx]} 2024</h1>
      <MonthDropdown
        setMonthIdx={setMonthIdx}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <Calendar
        selectedMonth={selectedMonth}
        monthIdx={monthIdx}
        holidays={holidays}
      />
    </Container>
  );
}

const organizeCountryHolidayIntoObject = (
  sv: Holiday[],
  us: Holiday[],
  monthIdx: number
) => {
  const holidayNamesByDay: { [key: number]: string[][] } = {
    1: [[], []],
    2: [[], []],
    3: [[], []],
    4: [[], []],
    5: [[], []],
    6: [[], []],
    7: [[], []],
    8: [[], []],
    9: [[], []],
    10: [[], []],
    11: [[], []],
    12: [[], []],
    13: [[], []],
    14: [[], []],
    15: [[], []],
    16: [[], []],
    17: [[], []],
    18: [[], []],
    19: [[], []],
    20: [[], []],
    21: [[], []],
    22: [[], []],
    23: [[], []],
    24: [[], []],
    25: [[], []],
    26: [[], []],
    27: [[], []],
    28: [[], []],
    29: [[], []],
    30: [[], []],
    31: [[], []],
  };

  sv.forEach((holiday) => {
    const holidayDateArr = holiday.date.split("-");
    if (holidayDateArr[1][0] === "0") {
      if (parseInt(holidayDateArr[1][1]) === monthIdx + 1) {
        if (holidayDateArr[2][0] === "0") {
          holidayNamesByDay[parseInt(holidayDateArr[2][1])][0].push(
            holiday.localName
          );
        } else {
          holidayNamesByDay[parseInt(holidayDateArr[2])][0].push(
            holiday.localName
          );
        }
      }
    } else {
      if (parseInt(holidayDateArr[1]) === monthIdx + 1) {
        if (holidayDateArr[2][0] === "0") {
          holidayNamesByDay[parseInt(holidayDateArr[2][1])][0].push(
            holiday.localName
          );
        } else {
          holidayNamesByDay[parseInt(holidayDateArr[2])][0].push(
            holiday.localName
          );
        }
      }
    }
  });

  us.forEach((holiday) => {
    let holidayDateArr = holiday.date.split("-");
    if (holidayDateArr[1][0] === "0") {
      if (parseInt(holidayDateArr[1][1]) === monthIdx + 1) {
        if (holidayDateArr[2][0] === "0") {
          holidayNamesByDay[parseInt(holidayDateArr[2][1])][1].push(
            holiday.localName
          );
        } else {
          holidayNamesByDay[parseInt(holidayDateArr[2])][1].push(
            holiday.localName
          );
        }
      }
    } else {
      if (parseInt(holidayDateArr[1]) === monthIdx + 1) {
        if (holidayDateArr[2][0] === "0") {
          holidayNamesByDay[parseInt(holidayDateArr[2][1])][1].push(
            holiday.localName
          );
        } else {
          holidayNamesByDay[parseInt(holidayDateArr[2])][1].push(
            holiday.localName
          );
        }
      }
    }
  });

  return holidayNamesByDay;
};

export default App;
