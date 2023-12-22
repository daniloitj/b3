import { Request, Response } from 'express';
import { findMaxRangeValueService } from '../../services/findMaxRangeValueService';
import { getMaxRangeValueController } from '../getMaxRangeValueController';

jest.mock('../../services/findMaxRangeValueService', () => ({
  findMaxRangeValueService: jest.fn(),
}));

describe('getMaxRangeValueController', () => {
  const mockReq = {
    params: { stock: 'TESTSTOCK' },
  } as unknown as Request;
  
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  it('should return max range value for a valid stock', async () => {
    (findMaxRangeValueService as jest.Mock).mockResolvedValue(50);

    await getMaxRangeValueController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      max_range_value: 50,
      ticker: 'TESTSTOCK',
    });
  });

  it('should return a 400 error if the stock parameter is missing', async () => {
    const mockReqWithNoStock = {
      params: {},
    } as unknown as Request;

    await getMaxRangeValueController(mockReqWithNoStock, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Missing stock parameter.',
    });
  });

  it('should handle errors from findMaxRangeValueService', async () => {
    (findMaxRangeValueService as jest.Mock).mockRejectedValue(new Error('Service failed'));

    await getMaxRangeValueController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Internal Server Error',
    });
  });
});
