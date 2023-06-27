import { getBankAccount, InsufficientFundsError, TransferFailedError } from '.';


describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(42);
    expect(acc).toEqual({ _balance: 42 });
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
    expect(acc).toEqual({ _balance: 42 + 100500 });
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(42);
    acc.withdraw(12);
    expect(acc).toEqual({ _balance: 42 - 12 });
  });

  test('should transfer money', () => {
    const sender = getBankAccount(42);
    const receiver = getBankAccount(0);
    const result = () => {
      sender.transfer(12, receiver);
    };
    expect(result).not.toThrow();
    expect(sender).toEqual({ _balance: 42 - 12 });
    expect(receiver).toEqual({ _balance: 12 });
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
