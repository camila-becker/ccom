export default (value) => {
  let splitDate = value.split(" ");
  let onlyDate = splitDate[0]
    .split("-")
    .reverse()
    .join("/");
  let onlyHour = splitDate[1];
  return `${onlyDate} - ${onlyHour}`;
};
