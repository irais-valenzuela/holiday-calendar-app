import { useState, useEffect } from "react";
import styled from "styled-components";
import { MonthDropdown, Calendar } from "./components";
import CustomHolidayModal from "./components/Modal";
import { MONTH_ARRAY, CustomHoliday } from "./constants";
import { organizeHolidays } from "./helperFunctions";

const Container = styled.div`
  margin: 32px;
`;

const CURRENT_DATE = new Date();
const CURRENT_MONTH_IDX = CURRENT_DATE.getMonth();
const CURRENT_MONTH = MONTH_ARRAY[CURRENT_MONTH_IDX];

function App() {
  const [selectedMonth, setSelectedMonth] = useState<string>(CURRENT_MONTH);
  const [monthIdx, setMonthIdx] = useState<number>(CURRENT_MONTH_IDX);
  const [svHolidays, setSvHolidays] = useState<{
    [key: number]: { [key: number]: string[] };
  }>({});
  const [usHolidays, setUsHolidays] = useState<{
    [key: number]: { [key: number]: string[] };
  }>({});
  const [customHolidays, setCustomHolidays] = useState<{
    [key: number]: { [key: number]: string[] };
  }>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<CustomHoliday>({
    name: "",
    date: "",
  });

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
      <CustomHolidayModal
        showModal={showModal}
        setShowModal={setShowModal}
        setModalData={setModalData}
        modalData={modalData}
        setCustomHolidays={setCustomHolidays}
      />
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

export default App;
