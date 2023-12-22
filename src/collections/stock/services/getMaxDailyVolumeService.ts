import { findMaxDailyVolumeRepository } from '../repository/findMaxDailyVolumeRepository';

export async function getMaxDailyVolumeService(ticker: string, dateFilter?: string): Promise<number> {
  try {
    return await findMaxDailyVolumeRepository(ticker, dateFilter);
  } catch (error) {
    console.error(`Erro no serviço ao buscar volume máximo diário: ${error}`);
    return 0;
  }
}
