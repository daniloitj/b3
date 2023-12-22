import fs from 'fs';
import { Collection, Db } from 'mongodb';
import path from 'path';
import { Payload } from 'payload';
import readline from 'readline';
import { countFileLines } from './utils/utils';

const BULK_WRITE_LIMIT = 2000;

const loadDirectDb = async (file: string, payload: Payload, db: Db, collection: Collection<any>) => {
  const fileName = path.basename(file);
  const totalLines = await countFileLines(file);
  let lineCount = 0;
  let lastLoggedProgress = 0;

  try {
    const fileStream = fs.createReadStream(file);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    let bulkOperations = [];
    for await (const line of rl) {
      lineCount++;

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

        bulkOperations.push({ insertOne: { document: stock } });

        const progressPercent = (lineCount / totalLines) * 100;

        if (progressPercent >= lastLoggedProgress + 10 || lineCount === totalLines) {
          payload.logger.info(`File: ${fileName} - Progress: ${progressPercent.toFixed(2)}% complete (${lineCount} of ${totalLines} lines).`);
          lastLoggedProgress = progressPercent - (progressPercent % 10); 
        }
        
        if (bulkOperations.length >= BULK_WRITE_LIMIT) {
          try {
            await collection.bulkWrite(bulkOperations);
          } catch (bulkError) {
            payload.logger.info('Error during bulk write:', bulkError);
          }
          bulkOperations = [];
        }
      }
    }
    if (bulkOperations.length > 0) {
      try {
        await collection.bulkWrite(bulkOperations);
      } catch (finalBulkError) {
        payload.logger.info('Error during the final bulk write:', finalBulkError);
      }
    }
    payload.logger.info(`Import successfully completed. 100% done (${lineCount} of ${totalLines} lines).`);
  } catch (error) {
    console.error('Error during connection or file reading:', error);
  } finally {
    payload.logger.info('— End loadDirectDb Seeding Stocks');
  }
};

export default loadDirectDb;


