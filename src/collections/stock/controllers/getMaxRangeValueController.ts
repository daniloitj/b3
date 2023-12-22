import { Request, Response } from 'express';
import { findMaxRangeValueService } from '../services/findMaxRangeValueService';

export async function getMaxRangeValueController(req: Request, res: Response): Promise<Response> {
  const stock = req.params.stock; 
  if (!stock) {
    return res.status(400).json({ error: 'Missing stock parameter.' });
  }
  try {
    const maxValue = await findMaxRangeValueService(stock);
    return res.status(200).json({ max_range_value: maxValue, ticker: stock });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
