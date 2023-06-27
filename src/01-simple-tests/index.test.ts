import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 9, b: 5, action: Action.Add });
    expect(result).toBe(14);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({
      a: -5,
      b: -12,
      action: Action.Subtract,
    });
    expect(result).toBe(7);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: -6,
      action: Action.Multiply,
    });
    expect(result).toBe(-18);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({
      a: 12,
      b: 4,
      action: Action.Divide,
    });
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: -3,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(-27);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 10,
      b: 5,
      action: 'plus',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'four',
      b: 2,
      action: Action.Multiply,
    });
    expect(result).toBeNull();
  });
});
