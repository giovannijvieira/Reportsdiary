import express from 'express';
import { gerarPDF, gerarPDF2, gerarPDF3 } from './src/services/gerarPDF'

const app = express();

app.get('/', (req, res) => {
  res.send('ok');
});

app.get('/report-users', async (req, res) => {
  try {
    const pdf = await gerarPDF(); // faz a consulta e gera o pdf
    res.contentType('application/pdf');
    res.send(pdf); // envia o pdf como resposta
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao gerar o PDF');
  }
});

app.get('/report-brokers', async (req, res) => {
  try {
    const pdf = await gerarPDF2(); // faz a consulta e gera o pdf
    res.contentType('application/pdf');
    res.send(pdf); // envia o pdf como resposta
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao gerar o PDF');
  }
});

app.get('/report-contracts', async (req, res) => {
  try {
    const pdf = await gerarPDF3(); // faz a consulta e gera o pdf
    res.contentType('application/pdf');
    res.send(pdf); // envia o pdf como resposta
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao gerar o PDF');
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});


import { CronJob } from 'cron';

import { enviarEmail } from './src/services/enviarEmail2';

// Configuração do horário de envio do e-mail
const schedule = '26 19 * * *'; // Enviar todo dia às 18:00

// Função que será executada quando a tarefa agendada for acionada
async function enviarEmailDiario() {
  // Gerar os PDFs
  const pdf1 = await gerarPDF();
  const pdf2 = await gerarPDF2();
  const pdf3 = await gerarPDF3();

  // Enviar o e-mail com os PDFs como anexos
  await enviarEmail();

  console.log('E-mail enviado com sucesso!');
}

// Cria a tarefa agendada
const job = new CronJob(schedule, enviarEmailDiario, null, true, 'America/Sao_Paulo');

// Inicia a tarefa agendada
job.start();

console.log(`Tarefa agendada para executar todo dia às ${job.cronTime.source}`);

