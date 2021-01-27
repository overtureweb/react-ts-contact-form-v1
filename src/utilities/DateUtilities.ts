import getDay from "date-fns/getDay";

/**
 *
 * @param startingYear
 * @param MAX
 */
export const getYearsForDropDown = (startingYear: number, MAX = 20): number[] => Array.from(Array(MAX), (v, k) => startingYear - k);

/**
 * constructs a list of short-form months
 */
export const getMonthsForDropDown: string[] = Array.from(Array(12), (v, k) => new Date(0o0000, k).toLocaleString('en-US', {month: "short"}));

export const isWeekday = (date: number | Date): boolean => getDay(date) % 6 !== 0;
