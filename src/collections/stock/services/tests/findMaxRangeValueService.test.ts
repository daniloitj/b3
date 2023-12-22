import { findMaxRangeValueRepository } from '../../repository/findMaxRangeValueRepository';
import { findMaxRangeValueService } from '../findMaxRangeValueService';

jest.mock('../../repository/findMaxRangeValueRepository');

describe('findMaxRangeValueService', () => {
  const mockTicker = 'TESTTICKER';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the maximum range value for a given ticker', async () => {
    const mockMaxRangeValue = 100;
    (findMaxRangeValueRepository as jest.Mock).mockResolvedValue(mockMaxRangeValue);

    const result = await findMaxRangeValueService(mockTicker);

    expect(findMaxRangeValueRepository).toHaveBeenCalledWith(mockTicker);
    expect(result).toBe(mockMaxRangeValue);
  });

  it('should handle errors and return null', async () => {
    const mockError = new Error('Repository failure');
    (findMaxRangeValueRepository as jest.Mock).mockRejectedValue(mockError);

    jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = await findMaxRangeValueService(mockTicker);

    expect(findMaxRangeValueRepository).toHaveBeenCalledWith(mockTicker);
    expect(console.error).toHaveBeenCalledWith(`Erro no serviço ao buscar valor máximo: ${mockError}`);
    expect(result).toBeNull();
  });
});
