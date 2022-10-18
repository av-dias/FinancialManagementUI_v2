export const setElementValueById = (id, name) => {
  document.getElementById(id).value = name;
};

export const getElementValueById = (id) => {
  return document.getElementById(id).value;
};
