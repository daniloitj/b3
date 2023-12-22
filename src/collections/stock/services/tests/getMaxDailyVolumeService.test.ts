import { findMaxDailyVolumeRepository } from '../../repository/findMaxDailyVolumeRepository';
import { getMaxDailyVolumeService } from '../getMaxDailyVolumeService';

jest.mock('../../repository/findMaxDailyVolumeRepository');

describe('getMaxDailyVolumeService', () => {
  const mockTicker = 'TESTTICKER';
  const mockDateFilter = '2023-01-01';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the maximum daily volume for a given ticker and date', async () => {
    const mockMaxDailyVolume = 500;
    (findMaxDailyVolumeRepository as jest.Mock).mockResolvedValue(mockMaxDailyVolume);

    const result = await getMaxDailyVolumeService(mockTicker, mockDateFilter);

    expect(findMaxDailyVolumeRepository).toHaveBeenCalledWith(mockTicker, mockDateFilter);
    expect(result).toBe(mockMaxDailyVolume);
  });

  it('should handle errors and return 0', async () => {
    const mockError = new Error('Repository failure');
    (findMaxDailyVolumeRepository as jest.Mock).mockRejectedValue(mockError);

    jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = await getMaxDailyVolumeService(mockTicker, mockDateFilter);

    expect(findMaxDailyVolumeRepository).toHaveBeenCalledWith(mockTicker, mockDateFilter);
    expect(console.error).toHaveBeenCalledWith(`Erro no serviço ao buscar volume máximo diário: ${mockError}`);
    expect(result).toBe(0);
  });
});
