import { SES } from 'aws-sdk';
import { gerarPDF, gerarPDF2, gerarPDF3 } from './gerarPDF';


const ses = new SES({ region: 'us-east-1' });


export async function enviarEmail(): Promise<void> {
  const pdfBuffer1 = await gerarPDF();
  const pdfBuffer2 = await gerarPDF2();
  const pdfBuffer3 = await gerarPDF3();

  const message = [
    `From: Remetente <giovanni.vieira@webropay.com.br>`,
    `To: <giovanni.vieira@webropay.com.br>`,
    `Subject: [INTERNO] - Atualização entrada de dados Webropay`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/mixed; boundary="B0und4ry"`,
    ``,
    `--B0und4ry`,
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: 7bit`,
    ``,
    `Olá, boa noite a todos!\n \nConforme solicitado, envio listagem atualizada dos dados inseridos em nossa plataforma referente aos novos usuários do portal, novos brokers, e novos contratos.\n \nQualquer dúvida, me coloco à disposição.`,
    ``,
    `--B0und4ry`,
    `Content-Type: application/pdf; name="relatorio1.pdf"`,
    `Content-Disposition: attachment; filename="relatorio1.pdf"`,
    `Content-Transfer-Encoding: base64`,
    ``,
    pdfBuffer1.toString('base64'),
    ``,
    `--B0und4ry`,
    `Content-Type: application/pdf; name="relatorio2.pdf"`,
    `Content-Disposition: attachment; filename="relatorio2.pdf"`,
    `Content-Transfer-Encoding: base64`,
    ``,
    pdfBuffer2.toString('base64'),
    ``,
    `--B0und4ry`,
    `Content-Type: application/pdf; name="relatorio3.pdf"`,
    `Content-Disposition: attachment; filename="relatorio3.pdf"`,
    `Content-Transfer-Encoding: base64`,
    ``,
    pdfBuffer3.toString('base64'),
    ``,
    `--B0und4ry--`,
  ].join('\n');

  const params = {
    RawMessage: {
      Data: message,
    },
    Source: 'Remetente <giovanni.vieira@webropay.com.br>',
    Destinations: ['giovanni.vieira@webropay.com.br','heitor.nishimura@webropay.com.br']
  };

  try {
    const result = await ses.sendRawEmail(params).promise();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}
