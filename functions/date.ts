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