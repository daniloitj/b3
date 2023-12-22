import payload from 'payload';
import { findMaxDailyVolumeRepository } from '../findMaxDailyVolumeRepository';

jest.mock('payload', () => ({
  find: jest.fn(),
}));

describe('findMaxDailyVolumeRepository', () => {
  const mockTicker = 'TESTTICKER';
  const mockDateFilter = '2023-01-01';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the maximum daily volume for a given ticker and date', async () => {
    const mockPayloadResponse = {
      docs: [
        { DataNegocio: '2023-01-01', QuantidadeNegociada: 300 },
        { DataNegocio: '2023-01-01', QuantidadeNegociada: 200 },
        { DataNegocio: '2023-01-02', QuantidadeNegociada: 100 },
      ],
    };
    (payload.find as jest.Mock).mockResolvedValue(mockPayloadResponse);

    const result = await findMaxDailyVolumeRepository(mockTicker, mockDateFilter);

    expect(payload.find).toHaveBeenCalledWith({
      collection: 'stocks',
      where: {
        CodigoInstrumento: { equals: mockTicker },
        DataNegocio: { gte: mockDateFilter },
      },
      limit: 10000,
    });
    expect(result).toBe(500); // 300 + 200 on '2023-01-01'
  });

  it('should handle empty results and return 0', async () => {
    (payload.find as jest.Mock).mockResolvedValue({ docs: [] });
  
    const result = await findMaxDailyVolumeRepository(mockTicker, mockDateFilter);
  
    expect(payload.find).toHaveBeenCalledWith({
      collection: 'stocks',
      where: {
        CodigoInstrumento: { equals: mockTicker },
        ...(mockDateFilter && { DataNegocio: { gte: mockDateFilter } }),
      },
      limit: 10000,
    });
    expect(result).toBe(0);
  });
});
