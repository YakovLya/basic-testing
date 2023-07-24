import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList(['first elem', 2]);
    expect(list).toStrictEqual({
      value: 'first elem',
      next: {
        value: 2,
        next: {
          value: null,
          next: null,
        },
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList(['first elem', 2, { value: 'elem 3' }]);
    expect(list).toMatchSnapshot();
  });
});
