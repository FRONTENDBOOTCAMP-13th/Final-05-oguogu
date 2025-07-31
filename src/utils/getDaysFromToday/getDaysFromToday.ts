import { parseISO, differenceInDays } from 'date-fns';

export default function getDaysFromToday(endDates: string[]) {
  const today = new Date(); // 오늘 날짜

  if (!Array.isArray(endDates)) {
    console.error('getDaysFromToday: endDates가 배열이 아님', endDates);
    return ['2025-12-31'];
  }

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
