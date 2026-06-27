import { describe, expect, it } from 'vitest';
import {
  getDrawAmountValidation,
  getRepayAmountValidation,
  REPAY_CONFIRM_THRESHOLD,
  requiresRepayConfirmation,
} from './amountValidation';

describe('getDrawAmountValidation', () => {
  const creditLine = { limit: 50000, available: 35000 };

  it('returns a warning when a draw would leave less than the reserve target', () => {
    const result = getDrawAmountValidation('32000', creditLine);

    expect(result.isValid).toBe(true);
    expect(result.feedback.severity).toBe('warning');
    expect(result.feedback.title).toBe('Below recommended reserve');
  });

  it('returns an error when the amount exceeds available credit', () => {
    const result = getDrawAmountValidation('36000', creditLine);

    expect(result.isValid).toBe(false);
    expect(result.feedback.severity).toBe('danger');
    expect(result.feedback.title).toBe('Exceeds available credit');
  });
});

describe('getRepayAmountValidation', () => {
  it('returns an error when the amount exceeds wallet balance', () => {
    const result = getRepayAmountValidation('6000', 8000, 4000);

    expect(result.isValid).toBe(false);
    expect(result.feedback.severity).toBe('danger');
    expect(result.feedback.title).toBe('Exceeds wallet balance');
  });

  it('returns a warning when repayment leaves too little wallet reserve', () => {
    const result = getRepayAmountValidation('3900', 8000, 4000);

    expect(result.isValid).toBe(true);
    expect(result.feedback.severity).toBe('warning');
    expect(result.feedback.title).toBe('Low wallet reserve');
  });
});

describe('REPAY_CONFIRM_THRESHOLD', () => {
  it('defaults to 5000', () => {
    expect(REPAY_CONFIRM_THRESHOLD).toBe(5000);
  });
});

describe('requiresRepayConfirmation', () => {
  it('returns false for amounts below the threshold', () => {
    expect(requiresRepayConfirmation(4999)).toBe(false);
    expect(requiresRepayConfirmation(0)).toBe(false);
    expect(requiresRepayConfirmation(1)).toBe(false);
  });

  it('returns true for amounts at the threshold', () => {
    expect(requiresRepayConfirmation(5000)).toBe(true);
  });

  it('returns true for amounts above the threshold', () => {
    expect(requiresRepayConfirmation(5001)).toBe(true);
    expect(requiresRepayConfirmation(10000)).toBe(true);
  });

  it('returns true for non-integer amounts at or above the threshold', () => {
    expect(requiresRepayConfirmation(5000.01)).toBe(true);
    expect(requiresRepayConfirmation(5250.50)).toBe(true);
  });
});
