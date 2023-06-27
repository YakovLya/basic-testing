import lodash from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(42);
    expect(acc.getBalance()).toEqual(42);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(42);
    const result = () => {
      acc.withdraw(42 + 10);
    };
    expect(result).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const sender = getBankAccount(42);
    const receiver = getBankAccount(0);
    const result = () => {
      sender.transfer(42 + 5, receiver);
    };
    expect(result).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(42);
    const result = () => {
      acc.transfer(42 - 10, acc);
    };
    expect(result).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(42);
    acc.deposit(100500);
    expect(acc.getBalance()).toEqual(42 + 100500);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(42);
    acc.withdraw(12);
    expect(acc.getBalance()).toEqual(42 - 12);
  });

  test('should transfer money', () => {
    const sender = getBankAccount(42);
    const receiver = getBankAccount(0);
    const result = () => {
      sender.transfer(12, receiver);
    };
    expect(result).not.toThrow();
    expect(sender.getBalance()).toEqual(42 - 12);
    expect(receiver.getBalance()).toEqual(12);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(42);
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(lodash.random(1, 100, false)) // first time random should work properly
      .mockReturnValueOnce(1); // second time random should return 1
    const result = await acc.fetchBalance();
    expect(result).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(42);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValueOnce(100500);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(100500);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(42);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValueOnce(null);
    expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
