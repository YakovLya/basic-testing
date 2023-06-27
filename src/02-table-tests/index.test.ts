import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 5, b: 9, action: Action.Add, expected: 14 },
  { a: -5, b: -12, action: Action.Subtract, expected: 7 },
  { a: 3, b: -6, action: Action.Multiply, expected: -18 },
  { a: 12, b: 4, action: Action.Divide, expected: 3 },
  { a: -3, b: 3, action: Action.Exponentiate, expected: -27 },
  { a: 12, b: 4, action: 'plus', expected: null },
  { a: 'four', b: 2, action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'table test: ($a, $b, $action)',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
