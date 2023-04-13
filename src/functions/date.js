export const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(date) {
  return monthNames[getCurrentMonth(date)[1] - 1] + "" + getCurrentMonth(date)[0];
}

// [year, month]
export function getCurrentMonth(currentDate) {
  return [parseInt(currentDate.substring(0, 4)), parseInt(currentDate.substring(4))];
}

export function increaseMonth(currentDate) {
  let [year, month] = getCurrentMonth(currentDate.toString());

  if (++month === 13) {
    month = 1;
    year = ++year;
  }
  if (month < 10) month = "0" + month;

  return year + "" + month;
}

export function decreaseMonth(currentDate) {
  let [year, month] = getCurrentMonth(currentDate.toString());

  if (--month === 0) {
    month = 12;
    year = --year;
  }
  if (month < 10) month = "0" + month;

  return year + "" + month;
}

export const getYear = (date) => {
  return date.substring(0, 4);
};

export const getMonth = (date) => {
  return date.substring(4);
};
