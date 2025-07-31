import { parseISO, differenceInDays } from 'date-fns';

export default function getDaysFromToday(endDates: string[]) {
  const today = new Date(); // 오늘 날짜

  return endDates.map(endDates => {
    const parsedDate = parseISO(endDates); // 문자열 -> Date
    const diff = differenceInDays(parsedDate, today);
    return diff;
  });
}

export function getDayFromToday(startDate: string, endDate: string) {
  const parsedStartDate = parseISO(startDate); // 문자열 -> Date
  const parsedEndDate = parseISO(endDate); // 문자열 -> Date
  const diff = differenceInDays(parsedEndDate, parsedStartDate);

  return diff;
}
