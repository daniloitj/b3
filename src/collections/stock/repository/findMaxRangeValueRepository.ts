import payload from 'payload';

export async function findMaxRangeValueRepository(ticker: string) {
  const docs = await payload.find({
    collection: 'stocks',
    where: { CodigoInstrumento: { equals: ticker } },
    limit: 10000, 
  });

  let maxRangeValue = 0;
  docs.docs.forEach(doc => {
    if (doc.PrecoNegocio > maxRangeValue) {
      maxRangeValue = doc.PrecoNegocio;
    }
  });

  return maxRangeValue;
}
