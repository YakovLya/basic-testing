import axios from 'axios';
//import lodash from 'lodash';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('posts');
    expect(spy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const spy = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi('users');
    jest.runOnlyPendingTimers();
    expect(spy).toBeCalledWith('users');
  });

  test('should return response data', async () => {
    const some_data = { data: 'test data' };
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve(some_data));
    const result = await throttledGetDataFromApi('some/path');
    expect(result).toBe(some_data.data);
  });
});
