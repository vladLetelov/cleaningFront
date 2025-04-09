import { vi, describe, it, expect } from 'vitest';
import axios from 'axios';
import { getRequestData } from '../data/request';

// Мокаем axios
vi.mock('axios');

describe('getRequestData', () => {
  it('Данные с сервера получены', async () => {
    const mockData = { data: { applications: ['app1', 'app2'] } };
    axios.get.mockResolvedValue(mockData);

    const data = await getRequestData();
    expect(data).toEqual({ applications: ['app1', 'app2'] });
  });
});
