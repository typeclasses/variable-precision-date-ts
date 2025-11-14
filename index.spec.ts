import { expect, it, describe } from "bun:test";
import { readVariablePrecisionDate, showVariablePrecisionDate, UnshowableVariablePrecisionDate } from '.'

describe('showVariablePrecisionDate', () => {

  it("can show day, month, or year", () => {
    expect(showVariablePrecisionDate(
      { precision: 'day', year: 2025, month: 2, day: 4 }))
      .toEqual('2025-02-04');
    expect(showVariablePrecisionDate(
      { precision: 'month', year: 2025, month: 2 }))
      .toEqual('2025-02');
    expect(showVariablePrecisionDate(
      { precision: 'year', year: 2025 }))
      .toEqual('2025');
  });

  it("can show weird or invalid dates", () => {
    expect(showVariablePrecisionDate(
      { precision: 'day', year: 0, month: 0, day: 0 }))
      .toEqual('0000-00-00');
    expect(showVariablePrecisionDate(
      { precision: 'day', year: 123456, month: 345678, day: 567123 }))
      .toEqual('123456-345678-567123');

    expect(showVariablePrecisionDate(
      { precision: 'month', year: 0, month: 0 }))
      .toEqual('0000-00');
    expect(showVariablePrecisionDate(
      { precision: 'month', year: 123456, month: 345678 }))
      .toEqual('123456-345678');

    expect(showVariablePrecisionDate(
      { precision: 'year', year: 0 }))
      .toEqual('0000');
    expect(showVariablePrecisionDate(
      { precision: 'year', year: 123456 }))
      .toEqual('123456');
  })

  it("rejects non-integer or negative numbers", () => {
    expect(() => showVariablePrecisionDate(
      { precision: 'day', year: -1, month: 0, day: 0 }))
      .toThrow(UnshowableVariablePrecisionDate)
    expect(() => showVariablePrecisionDate(
      { precision: 'day', year: 0, month: -1, day: 0 }))
      .toThrow(UnshowableVariablePrecisionDate)
    expect(() => showVariablePrecisionDate(
      { precision: 'day', year: 0, month: -1, day: -1 }))
      .toThrow(UnshowableVariablePrecisionDate)
    expect(() => showVariablePrecisionDate(
      { precision: 'day', year: 1.5, month: 0, day: 0 }))
      .toThrow(UnshowableVariablePrecisionDate)
    expect(() => showVariablePrecisionDate(
      { precision: 'day', year: 0, month: 1.5, day: 0 }))
      .toThrow(UnshowableVariablePrecisionDate)
    expect(() => showVariablePrecisionDate(
      { precision: 'day', year: 0, month: 0, day: 1.5 }))
      .toThrow(UnshowableVariablePrecisionDate)

    expect(() => showVariablePrecisionDate(
      { precision: 'month', year: -1, month: 0 }))
      .toThrow(UnshowableVariablePrecisionDate)
    expect(() => showVariablePrecisionDate(
      { precision: 'month', year: 0, month: -1 }))
      .toThrow(UnshowableVariablePrecisionDate)
    expect(() => showVariablePrecisionDate(
      { precision: 'month', year: 1.5, month: 0 }))
      .toThrow(UnshowableVariablePrecisionDate)
    expect(() => showVariablePrecisionDate(
      { precision: 'month', year: 0, month: 1.5 }))
      .toThrow(UnshowableVariablePrecisionDate)

    expect(() => showVariablePrecisionDate(
      { precision: 'year', year: -1 }))
      .toThrow(UnshowableVariablePrecisionDate)
    expect(() => showVariablePrecisionDate(
      { precision: 'year', year: 1.5 }))
      .toThrow(UnshowableVariablePrecisionDate)
  })
})

describe('readVariablePrecisionDate', () => {

  it("can read day, month, or year", () => {
    expect(readVariablePrecisionDate('2025-02-04'))
      .toEqual({ precision: 'day', year: 2025, month: 2, day: 4 });
    expect(readVariablePrecisionDate('2025-02'))
      .toEqual({ precision: 'month', year: 2025, month: 2 });
    expect(readVariablePrecisionDate('2025'))
      .toEqual({ precision: 'year', year: 2025 });
  });

  it("disregards leading zeroes", () => {
    expect(readVariablePrecisionDate('02025-02-04'))
      .toEqual(readVariablePrecisionDate('2025-2-4'))
    expect(readVariablePrecisionDate('002025-002-004'))
      .toEqual(readVariablePrecisionDate('2025-2-4'))
  })

  it("can read weird or invalid dates", () => {
    expect(readVariablePrecisionDate('0'))
      .toEqual({ precision: 'year', year: 0 });
    expect(readVariablePrecisionDate('0-0'))
      .toEqual({ precision: 'month', year: 0, month: 0 });
    expect(readVariablePrecisionDate('0-0-0'))
      .toEqual({ precision: 'day', year: 0, month: 0, day: 0 });
    expect(readVariablePrecisionDate('1-2-3'))
      .toEqual({ precision: 'day', year: 1, month: 2, day: 3 });
    expect(readVariablePrecisionDate('00'))
      .toEqual({ precision: 'year', year: 0 });
    expect(readVariablePrecisionDate('00-00'))
      .toEqual({ precision: 'month', year: 0, month: 0 });
    expect(readVariablePrecisionDate('00-00-00'))
      .toEqual({ precision: 'day', year: 0, month: 0, day: 0 });
    expect(readVariablePrecisionDate('123456'))
      .toEqual({ precision: 'year', year: 123456 });
    expect(readVariablePrecisionDate('123456-345678'))
      .toEqual({ precision: 'month', year: 123456, month: 345678 });
    expect(readVariablePrecisionDate('123456-345678-567123'))
      .toEqual({ precision: 'day', year: 123456, month: 345678, day: 567123 });
  })

  it("rejects malformed input", () => {
    expect(readVariablePrecisionDate('')).toBeUndefined()
    expect(readVariablePrecisionDate('a')).toBeUndefined()
    expect(readVariablePrecisionDate('-')).toBeUndefined()
    expect(readVariablePrecisionDate('-1')).toBeUndefined()
    expect(readVariablePrecisionDate('a1')).toBeUndefined()
    expect(readVariablePrecisionDate('a-1')).toBeUndefined()
    expect(readVariablePrecisionDate('2025 ')).toBeUndefined()
    expect(readVariablePrecisionDate(' 2025')).toBeUndefined()
    expect(readVariablePrecisionDate('-2025')).toBeUndefined()
    expect(readVariablePrecisionDate('2025-')).toBeUndefined()
    expect(readVariablePrecisionDate('2025--1')).toBeUndefined()
    expect(readVariablePrecisionDate('2025 1')).toBeUndefined()
    expect(readVariablePrecisionDate('2025- 1')).toBeUndefined()
    expect(readVariablePrecisionDate('2025 -1')).toBeUndefined()
    expect(readVariablePrecisionDate('2025 - 1')).toBeUndefined()
    expect(readVariablePrecisionDate('1\n')).toBeUndefined()
    expect(readVariablePrecisionDate('1\n2')).toBeUndefined()
    expect(readVariablePrecisionDate('\n1')).toBeUndefined()
  })
})
