import STATUS from "../utility/status";

export function truncateMax(data) {
  if (data.length > STATUS.NAME_MAX_LENGTH)
    return data.slice(0, STATUS.NAME_MAX_LENGTH - 1);
  return data;
}

export const todayDate = (date) => {
  const today = new Date(date) || new Date();
  const year = today.getFullYear();
  const month =
    today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  const day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  return year + "-" + month + "-" + day;
};
