import { Request, Response } from 'express';
import { getMaxDailyVolumeService } from '../services/getMaxDailyVolumeService';

export async function getMaxDailyVolumeController(req: Request, res: Response): Promise<Response> {
  const stock = req.params.stock;
  const dateFilter = req.query.date as string;

  if (!stock) {
    return res.status(400).json({ error: 'Missing stock parameter.' });
  }

  try {
    const maxVolume = await getMaxDailyVolumeService(stock, dateFilter);
    return res.status(200).json({ max_daily_volume: maxVolume, ticker: stock });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
