# variable-precision-date

For events such as publishing a blog post, one generally wants to
attach some time to the event, but it is not always desirable to
use a precise timestamp. A year, month, and date often suffices.

```typescript
{ precision: 'day', year: 2025, month: 7, day: 14 }
```

In some cases even less precision is called for; perhaps we are
describing an event that took place in the seventh month of 2025,
but the exact day is unknown.

```typescript
{ precision: 'month', year: 2025, month: 7 }
```

Going one step further, placing an event within a year only:

```typescript
{ precision: 'year', year: 2025 }
```

The examples above are values of the type `VariablePrecisionDate`
defined in this library.

Also provided are functions `showVariablePrecisionDate` and
`readVariablePrecisionDate`, which render and parse the format
`2025-07-14`.

The rendering pads years to four digits, and months and days to
two digits. This allows commonplace dates to sort lexically.
Parsing accepts any number of leading zeros.

No validation of dates is performed by this library; for example,
`1153543-0-040` will read as *year 1153543, month 0, day 40*.
Parsing is otherwise strict; only numeric characters `0` through
`9` and a single `-` for each separator are permitted.
