import moment from 'moment-timezone';

export const getDateByFormat = (date, format:string) => {
  return moment(date).format(format);
}

export const getNowDateByFormat = (format:string) => {
  return moment().tz(process.env.NEXT_PUBLIC_TIMEZONE).format(format); 
}

export const getNowDate = () => {
  return moment().tz(process.env.NEXT_PUBLIC_TIMEZONE).format('YYYY-MM-DD'); 
}

export const getNowDateTime = () => {
  return moment().tz(process.env.NEXT_PUBLIC_TIMEZONE).format('YYYY-MM-DD HH:mm:ss'); 
}

export const getStartOfWeekDate = () => {
  return moment().tz(process.env.NEXT_PUBLIC_TIMEZONE).startOf('isoWeek').format('YYYY-MM-DD'); 
}

export const getEndOfWeekDate = () => {
  return moment().tz(process.env.NEXT_PUBLIC_TIMEZONE).endOf('isoWeek').format('YYYY-MM-DD'); 
}

export const getLastSevenDaysDate = () => {
  return moment().tz(process.env.NEXT_PUBLIC_TIMEZONE).subtract(7,'d').format('YYYY-MM-DD'); 
}

export const getElapseTime = (date: any, suffix: boolean = false) => {
  if(date) return moment(date).fromNow(suffix);
  
  return "Unknown";
}

export const convertSecondToTime = (secondDuration: number) => {
  let hour = 0;
  let hourRemainder = 0;

  let miniute = 0;

  let second = 0;

  // Calculate hour
  hour = Math.floor(secondDuration / 3600);
  hourRemainder = Math.floor(secondDuration % 3600);

  // Calculate minute and second
  if(hourRemainder > 0) {
    miniute = Math.floor(hourRemainder / 60);
    second = Math.floor(hourRemainder % 60);
  }

  return (hour > 0 ? pad(hour, 2) + ":" : "") + pad(miniute, 2) + ":" + pad(second, 2);
}

const pad = (number: number, size: number) => {
  let num = number.toString();
  while (num.length < size) num = "0" + num;
  return num;
}