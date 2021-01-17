/**
 *
 * @param startingYear
 * @param MAX
 */
export const getYearsForDropDown = (startingYear: number, MAX = 20): number[] => Array.from(Array(MAX), (v, k) => startingYear - k);

/**
 * constructs a list of short-form months
 */
export const getMonthsForDropDown: string[] = Array.from(Array(12), (v, k) => new Intl.DateTimeFormat('en-US', {month: "short"}).format(new Date(2021, k)));
