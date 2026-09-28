// src/utils/__tests__/dateUtils.test.js

import { toLogDate } from '../dateUtils';

describe('toLogDate', () => {
  test('full dates become YYYY-MM-DD', () => {
    expect(toLogDate('January 3, 2026')).toBe('2026-01-03');
    expect(toLogDate('May 20, 2024')).toBe('2024-05-20');
  });

  test('month-only dates become YYYY-MM', () => {
    expect(toLogDate('July 2026')).toBe('2026-07');
    expect(toLogDate('May 2026')).toBe('2026-05');
  });

  test('unparseable or empty input is passed through', () => {
    expect(toLogDate('someday')).toBe('someday');
    expect(toLogDate('')).toBe('');
    expect(toLogDate(undefined)).toBe('');
  });
});
