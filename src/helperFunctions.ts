import { Holiday } from "./constants";
import { CustomHoliday } from "./constants";
/*
 organizeHolidays organizes the api holiday results  into 2 seperate objects. Each object stores the holiday months in which there are holidays as a number key
 and value for that month is another object that holds keys corresponding to days in which there are holidays the day keys
 then store strings representing the localName of the holiday in an array. These 2 objects are then stored in an array and returned. 
 */
export const organizeHolidays = (sv: Holiday[], us: Holiday[]) => {
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

export const organizeCustomHolidays = (
  customHoliday: CustomHoliday,
  setCustomHolidays: (value: {
    [key: number]: { [key: number]: string[] };
  }) => void
) => {
  const month = customHoliday.date[5] + customHoliday.date[6]
  const day = customHoliday.date[8] + customHoliday.date[9]

};
