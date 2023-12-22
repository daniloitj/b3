// simpleClusterTest.ts

import os from 'os';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

const numCPUs = os.cpus().length;

interface WorkerData {
  id: number;
  filePath: string;
}

const processFile = (filePath: string, workerId: number): void => {
  console.log(`Worker ${workerId} começou a processar o arquivo: ${filePath}`);
  
  // Simulando um trabalho pesado (substitua por sua lógica real)
  setTimeout(() => {
    console.log(`Worker ${workerId} está trabalhando no arquivo: ${filePath}`);
    if (parentPort) parentPort.postMessage(`Worker ${workerId} concluiu o trabalho no arquivo: ${filePath}`);
  }, 2000);
};

const loadThreads = (filePath: string): void => {
  if (isMainThread) {
    console.log(`Thread principal ${process.pid} está rodando`);

    for (let i = 0; i < numCPUs; i++) {
      const worker = new Worker(__filename, { workerData: { id: i + 1, filePath } });

      worker.on('message', (msg) => {
        console.log(`Mensagem do worker:`, msg);
      });

      worker.on('error', (err) => {
        console.error(`Worker erro: ${err}`);
      });

      worker.on('exit', (code) => {
        if (code !== 0)
          console.error(`Worker parou com o código de saída ${code}`);
        else
          console.log(`Worker terminou com sucesso`);
      });
    }
  } else {
    console.log(`Worker iniciado com threadId ${workerData.id} e PID: ${process.pid}`);
    processFile(workerData.filePath, workerData.id);
  }
};

export default loadThreads;
