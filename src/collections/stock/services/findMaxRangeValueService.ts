import { findMaxRangeValueRepository } from '../repository/findMaxRangeValueRepository';

export async function findMaxRangeValueService(ticker: string) {
  try {
    return await findMaxRangeValueRepository(ticker);
  } catch (error) {
    console.error(`Erro no serviço ao buscar valor máximo: ${error}`);
    return null;
  }
}
