# Business days between two dates

**Use in:** a Label's `Text`, or anywhere you need a number.
**Assumes:** `StartDate` and `EndDate` are date values; weekends are Saturday and Sunday. Holidays are not excluded.

```powerfx
With(
    { d: Sequence(DateDiff(StartDate, EndDate, TimeUnit.Days) + 1, 0) },
    CountIf(d, Weekday(DateAdd(StartDate, Value, TimeUnit.Days), StartOfWeek.Monday) < 6)
)
```

**Notes:** runs locally (no delegation). Works for ranges up to ~50,000 days.
