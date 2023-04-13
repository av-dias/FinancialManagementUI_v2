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

export const checkMissingMonths = (data) => {
  let dates = Object.keys(data);

  let lastMonth;
  let lastYear;

  dates.forEach((date) => {
    let year = getYear(date);
    let month = getMonth(date);
    let checkMonth = month - lastMonth;
    let checkYear = year - lastYear;

    if (checkMonth > 1 || checkYear > 0) {
      while (checkMonth > 1 && checkYear < 1) {
        if (--month === 0) {
          month = 12;
          year--;
          checkYear--;
          checkMonth = month - lastMonth;
        }
        if (month < 10) month = "0" + month;
        data[year + month] = data[lastYear + lastMonth];

        checkMonth--;
      }
    }

    lastYear = getYear(date);
    lastMonth = getMonth(date);
  });

  return data;
};
