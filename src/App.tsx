import { useState, useEffect } from "react";
import styled from "styled-components";
import { MonthDropdown, Calendar } from "./components";
import CustomHolidayModal from './components/Modal';
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
  const [svHolidays, setSvHolidays] = useState({});
  const [usHolidays, setUsHolidays] = useState({});
  const [showModal, setShowModal] = useState<boolean>(false)


  const fetchSVHolidays = () =>
    fetch("https://date.nager.at/api/v3/publicholidays/2024/SV");

  const fetchUSHolidays = () =>
    fetch("https://date.nager.at/api/v3/publicholidays/2024/US");

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const responses = await Promise.all([
          fetchSVHolidays(),
          fetchUSHolidays(),
        ]);

        if (!responses.every((response) => response.ok)) {
          throw new Error("One or more API calls failed");
        }

        const holidays = await Promise.all(
          responses.map((response) => response.json())
        );

        const sv = holidays[0];
        const us = holidays[1];
        const organizedHolidays = organizeHolidays(sv, us);

        setSvHolidays(organizedHolidays[0]);
        setUsHolidays(organizedHolidays[1]);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <Container>
      <h1 className="center-text">{MONTH_ARRAY[monthIdx]} 2024</h1>
      <MonthDropdown
        setMonthIdx={setMonthIdx}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <CustomHolidayModal showModal={showModal} setShowModal={setShowModal}/>
      <Calendar
        selectedMonth={selectedMonth}
        monthIdx={monthIdx}
        svHolidays={svHolidays}
        usHolidays={usHolidays}
        setShowModal={setShowModal}
      />
    </Container>
  );
}

/*
 organizeHolidays organizes the api holiday results  into 2 seperate objects. Each object stores the holiday months in which there are holidays as a number key
 and value for that month is another object that holds keys corresponding to days in which there are holidays the day keys
 then store strings representing the localName of the holiday in an array. These 2 objects are then stored in an array and returned. 
 */
const organizeHolidays = (sv: Holiday[], us: Holiday[]) => {
  const svHolidays: { [key: number]: { [key: number]: string[] } } = {};

  sv.forEach((holiday) => {
    const monthPart1 = holiday.date[5];
    const monthPart2 = holiday.date[6];
    const dayPart1 = holiday.date[8];
    const dayPart2 = holiday.date[9];

    const month = parseInt(monthPart1 + monthPart2);
    const day = parseInt(dayPart1 + dayPart2);

    if (svHolidays.hasOwnProperty(month)) {
      if (!svHolidays[month].hasOwnProperty(day)) {
        svHolidays[month][day] = [];
      }
      svHolidays[month][day].push(holiday.localName);
    } else {
      svHolidays[month] = {};
      if (!svHolidays[month].hasOwnProperty(day)) {
        svHolidays[month][day] = [];
      }
      svHolidays[month][day].push(holiday.localName);
    }
  });

  const usHolidays: { [key: number]: { [key: number]: string[] } } = {};

  us.forEach((holiday) => {
    const monthPart1 = holiday.date[5];
    const monthPart2 = holiday.date[6];
    const dayPart1 = holiday.date[8];
    const dayPart2 = holiday.date[9];

    const month = parseInt(monthPart1 + monthPart2);
    const day = parseInt(dayPart1 + dayPart2);

    if (usHolidays.hasOwnProperty(month)) {
      if (!usHolidays[month].hasOwnProperty(day)) {
        usHolidays[month][day] = [];
      }
      usHolidays[month][day].push(holiday.localName);
    } else {
      usHolidays[month] = {};
      if (!usHolidays[month].hasOwnProperty(day)) {
        usHolidays[month][day] = [];
      }
      usHolidays[month][day].push(holiday.localName);
    }
  });

  return [svHolidays, usHolidays];
};

export default App;
