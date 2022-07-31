import moment from "moment";

const monthArray = [
  {
    label: "Jan",
    date: moment().format("YYYY") + "-" + "01-01",
  },
  {
    label: "Feb",
    date: moment().format("YYYY") + "-" + "02-01",
  },
  {
    label: "Mar",
    date: moment().format("YYYY") + "-" + "03-01",
  },
  {
    label: "Apr",
    date: moment().format("YYYY") + "-" + "04-01",
  },
  {
    label: "May",
    date: moment().format("YYYY") + "-" + "05-01",
  },
  {
    label: "Jun",
    date: moment().format("YYYY") + "-" + "06-01",
  },
  {
    label: "Jul",
    date: moment().format("YYYY") + "-" + "07-01",
  },
  {
    label: "Aug",
    date: moment().format("YYYY") + "-" + "08-01",
  },
  {
    label: "Sep",
    date: moment().format("YYYY") + "-" + "09-01",
  },
  {
    label: "Oct",
    date: moment().format("YYYY") + "-" + "10-01",
  },
  {
    label: "Nox",
    date: moment().format("YYYY") + "-" + "11-01",
  },
  {
    label: "Dec",
    date: moment().format("YYYY") + "-" + "12-01",
  },
];

export default monthArray;
