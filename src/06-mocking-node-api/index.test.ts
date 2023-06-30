import path from 'path';
import { join } from 'path';
import fs from 'fs';
import fs_promises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    doStuffByTimeout(cb, 42);
    expect(setTimeout).toBeCalledWith(cb, 42);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 42);
    expect(cb).not.toBeCalled();
    jest.runAllTimers();
    expect(cb).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const cb = jest.fn();
    doStuffByInterval(cb, 42);
    expect(setInterval).toBeCalledWith(cb, 42);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, 42);
    expect(cb).not.toBeCalled();
    for (let num = 1; num <= 3; num++) {
      jest.runOnlyPendingTimers();
      expect(cb).toBeCalledTimes(num);
    }
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    const path_ex = './../dir_dir';
    readFileAsynchronously(path_ex);
    expect(join).toBeCalled();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const result = await readFileAsynchronously('./path_to_file.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    const data = 'test data';
    jest.spyOn(fs_promises, 'readFile').mockResolvedValueOnce(data);
    const result = await readFileAsynchronously('./path_to_file.txt');
    expect(result).toBe(data);
  });
});
