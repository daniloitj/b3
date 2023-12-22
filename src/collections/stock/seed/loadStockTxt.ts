import { queue } from 'async';
import fs from 'fs';
import { Payload } from 'payload';
import type { Stock } from 'payload/generated-types';
import readline from 'readline';

const QUEUE_CONCURRENCY = 5;
const QUEUE_SIZE_LIMIT = 50;

const loadStockTxt = async (file: string, payload: Payload): Promise<void> => {
  try {
    payload.logger.info('— Seeding Stocks');

    const fileStream = fs.createReadStream(file);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    let queueIsDrained = true;

    const insertQueue = queue(async (task: Omit<Stock, 'id' | 'updatedAt' | 'createdAt'>, done) => {
        await payload.create({ collection: 'stocks', data: task });
        payload.logger.info('inserted');
      done();
    }, QUEUE_CONCURRENCY);

    insertQueue.drain(() => {
      queueIsDrained = true;
    });

    for await (const line of rl) {
      if (!line.startsWith('DataReferencia')) {
        const [
          dataReferencia,
          codigoInstrumento,
          acaoAtualizacao,
          precoNegocio,
          quantidadeNegociada,
          horaFechamento,
          codigoIdentificadorNegocio,
          tipoSessaoPregao,
          dataNegocio,
          codigoParticipanteComprador,
          codigoParticipanteVendedor,
        ] = line.split(';');

        const stock = {
          DataReferencia: new Date(dataReferencia).toISOString(),
          CodigoInstrumento: codigoInstrumento,
          AcaoAtualizacao: parseInt(acaoAtualizacao, 10),
          PrecoNegocio: parseFloat(precoNegocio.replace(',', '.')),
          QuantidadeNegociada: parseInt(quantidadeNegociada, 10),
          HoraFechamento: horaFechamento,
          CodigoIdentificadorNegocio: codigoIdentificadorNegocio,
          TipoSessaoPregao: parseInt(tipoSessaoPregao, 10),
          DataNegocio: new Date(dataNegocio).toISOString(),
          CodigoParticipanteComprador: codigoParticipanteComprador,
          CodigoParticipanteVendedor: codigoParticipanteVendedor,
        };

        insertQueue.push(stock);
        queueIsDrained = false;

        while (insertQueue.length() >= QUEUE_SIZE_LIMIT || !queueIsDrained) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }

    // Espera até que a fila esteja completamente esvaziada
    while (!queueIsDrained) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    payload.logger.info('— Stocks seeded successfully');
  } catch (error) {
    console.error(error);
    payload.logger.error('— Error seeding Stocks');
  }
};

export default loadStockTxt;
