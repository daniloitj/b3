import { Request, Response } from 'express';
import { getMaxDailyVolumeService } from '../../services/getMaxDailyVolumeService';
import { getMaxDailyVolumeController } from '../getMaxDailyVolumeController';

jest.mock('../../services/getMaxDailyVolumeService', () => ({
  getMaxDailyVolumeService: jest.fn(),
}));

describe('getMaxDailyVolumeController', () => {
  it('should return max daily volume for a valid stock', async () => {
    const mockReq = {
      params: { stock: 'TESTSTOCK' },
      query: { date: '2023-01-01' },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (getMaxDailyVolumeService as jest.Mock).mockResolvedValue(100);

    await getMaxDailyVolumeController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      max_daily_volume: 100,
      ticker: 'TESTSTOCK',
    });
  });

  it('should return a 400 error if the stock parameter is missing', async () => {
    const mockReq = {
      params: {},
      query: {},
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getMaxDailyVolumeController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Missing stock parameter.',
    });
  });
    
  it('should handle errors from getMaxDailyVolumeService', async () => {
    (getMaxDailyVolumeService as jest.Mock).mockRejectedValue(new Error('Service failed'));
  
    const mockReq = {
        params: { stock: 'TESTSTOCK' },
        query: { date: '2023-01-01' },
    } as unknown as Request;

    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;
      
    await getMaxDailyVolumeController(mockReq, mockRes);
  
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Internal Server Error',
    });
  });
      
});
