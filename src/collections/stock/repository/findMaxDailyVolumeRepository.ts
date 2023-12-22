import payload from 'payload';

export async function findMaxDailyVolumeRepository(ticker: string, dateFilter?: string): Promise<number> {
  const query: any = {
    collection: 'stocks',
    where: {
      CodigoInstrumento: {
        equals: ticker
      },
      ...(dateFilter && { DataNegocio: { gte: dateFilter } })
    },
    limit: 10000
  };

  const docs = await payload.find(query);

  const volumeByDate: Record<string, number> = {};
  docs.docs.forEach((doc: any) => {
    const date = doc.DataNegocio;
    const quantidadeNegociada = doc.QuantidadeNegociada as number;
    volumeByDate[date] = (volumeByDate[date] || 0) + quantidadeNegociada;
  });

  const volumes = Object.values(volumeByDate);
  return volumes.length > 0 ? Math.max(...volumes) : 0;
}
