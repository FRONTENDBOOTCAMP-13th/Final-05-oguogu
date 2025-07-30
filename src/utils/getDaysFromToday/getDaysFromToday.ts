import { parseISO, differenceInDays } from 'date-fns';

export default function getDaysFromToday(dates: string[]) {
  const today = new Date(); // 오늘 날짜
  return dates.map(date => {
    const parsedDate = parseISO(date); // 문자열 -> Date
    const diff = differenceInDays(parsedDate, today);
    return diff;
  });
}
