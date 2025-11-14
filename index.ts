export type Year = { year: number; }
export type Month = Year & { month: number }
export type Day = Month & { day: number }

export type VariablePrecisionDate =
  ({ precision: 'year' } & Year) |
  ({ precision: 'month' } & Month) |
  ({ precision: 'day' } & Day)

export function readVariablePrecisionDate(x: string):
  VariablePrecisionDate | undefined {

  const r = x.match(/^([0-9]+)(?:-([0-9]+)(?:-([0-9]+))?)?$/);
  if (r === null) return undefined;
  const [_, y, m, d] = r;
  if (y === undefined) return undefined

  const year = parseInt(y, 10);
  if (Number.isNaN(year)) return undefined;
  if (m === undefined) return { precision: 'year', year };

  const month = parseInt(m, 10);
  if (Number.isNaN(month)) return undefined;
  if (d === undefined) return { precision: 'month', year, month };

  const day = parseInt(d, 10);
  if (Number.isNaN(day)) return undefined;
  return { precision: 'day', year, month, day };
}

export function showVariablePrecisionDate(x: VariablePrecisionDate): string {
  if (!Number.isInteger(x.year) || x.year < 0)
    throw new UnshowableVariablePrecisionDate()
  let s = x.year.toString().padStart(4, '0')
  if (x.precision === 'year') return s

  if (!Number.isInteger(x.month) || x.month < 0)
    throw new UnshowableVariablePrecisionDate()
  s += '-' + x.month.toString().padStart(2, '0')
  if (x.precision === 'month') return s

  if (!Number.isInteger(x.day) || x.day < 0)
    throw new UnshowableVariablePrecisionDate()
  s += '-' + x.day.toString().padStart(2, '0')
  return s
}

export class UnshowableVariablePrecisionDate extends Error { }
