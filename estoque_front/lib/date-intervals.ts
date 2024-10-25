import moment from "moment";

export const getThisMonthInitialDate = () => {
  return moment().startOf("month").format("YYYY-MM-DD");
};

export const getThisMonthEndingDate = () => {
  return moment().endOf("month").format("YYYY-MM-DD");
};

export const getTodayMinusThirtyDays = () => {
  return moment().subtract(30, "day").format("YYYY-MM-DD");
};

export const getToday = () => {
  return moment().format("YYYY-MM-DD");
};

export const getXMonthsAgoInitialDate = (number: number) => {
  return moment()
    .subtract(number, "month")
    .startOf("month")
    .format("YYYY-MM-DD");
};

export const getXMonthsAgoEndingDate = (number: number) => {
  return moment().subtract(number, "month").endOf("month").format("YYYY-MM-DD");
};

export const dateIntervals = [
  {
    name: "Mês Atual",
    final_date: getThisMonthEndingDate(),
    initial_date: getThisMonthInitialDate(),
  },
  {
    name: "Últimos 30 dias",
    final_date: getToday(),
    initial_date: getTodayMinusThirtyDays(),
  },
  {
    name: "Mês Passado",
    final_date: getXMonthsAgoEndingDate(1),
    initial_date: getXMonthsAgoInitialDate(1),
  },
  {
    name: "Mês Retrasado",
    final_date: getXMonthsAgoEndingDate(2),
    initial_date: getXMonthsAgoInitialDate(2),
  },
  {
    name: "3 meses atrás",
    final_date: getXMonthsAgoEndingDate(3),
    initial_date: getXMonthsAgoInitialDate(3),
  },
  {
    name: "4 meses atrás",
    final_date: getXMonthsAgoEndingDate(4),
    initial_date: getXMonthsAgoInitialDate(4),
  },
  {
    name: "5 meses atrás",
    final_date: getXMonthsAgoEndingDate(5),
    initial_date: getXMonthsAgoInitialDate(5),
  },
  {
    name: "6 meses atrás",
    final_date: getXMonthsAgoEndingDate(6),
    initial_date: getXMonthsAgoInitialDate(6),
  },
];
