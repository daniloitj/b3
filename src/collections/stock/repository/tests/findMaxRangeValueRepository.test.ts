import payload from 'payload';
import { findMaxRangeValueRepository } from '../findMaxRangeValueRepository';

jest.mock('payload', () => ({
  find: jest.fn(),
}));

describe('findMaxRangeValueRepository', () => {
  const mockTicker = 'TESTTICKER';

  it('should return the maximum range value for a given ticker', async () => {
    const mockPayloadResponse = {
      docs: [
        { PrecoNegocio: 100 },
        { PrecoNegocio: 150 },
        { PrecoNegocio: 80 },
      ],
    };
    (payload.find as jest.Mock).mockResolvedValue(mockPayloadResponse);

    const result = await findMaxRangeValueRepository(mockTicker);
    expect(result).toBe(150);
  });

  it('should return 0 if no documents are found', async () => {
    (payload.find as jest.Mock).mockResolvedValue({ docs: [] });

    const result = await findMaxRangeValueRepository(mockTicker);
    expect(result).toBe(0);
  });

  it('should handle multiple maximum values correctly', async () => {
    const mockPayloadResponse = {
      docs: [
        { PrecoNegocio: 200 },
        { PrecoNegocio: 200 },
        { PrecoNegocio: 100 },
      ],
    };
    (payload.find as jest.Mock).mockResolvedValue(mockPayloadResponse);

    const result = await findMaxRangeValueRepository(mockTicker);
    expect(result).toBe(200);
  });

  it('should handle negative values correctly', async () => {
    const mockPayloadResponse = {
      docs: [
        { PrecoNegocio: -100 },
        { PrecoNegocio: -50 },
      ],
    };
    (payload.find as jest.Mock).mockResolvedValue(mockPayloadResponse);

    const result = await findMaxRangeValueRepository(mockTicker);
    expect(result).toBe(0); 
  });

  it('should handle non-numeric or missing values correctly', async () => {
    const mockPayloadResponse = {
      docs: [
        { PrecoNegocio: 'NaN' },
        { OtherField: 200 },
      ],
    };
    (payload.find as jest.Mock).mockResolvedValue(mockPayloadResponse);

    const result = await findMaxRangeValueRepository(mockTicker);
    expect(result).toBe(0); // Assuming non-numeric or missing values are ignored
  });

});
