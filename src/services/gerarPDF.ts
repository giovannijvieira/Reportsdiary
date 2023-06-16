import PDFDocument from 'pdfkit';
import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    database: process.env.DATABASE,
    password: process.env.PWD_DB,
    port: process.env.PORT_DB,
});

export async function gerarPDF(): Promise<Buffer> {
    const doc = new PDFDocument();
  
    doc.text('USUÁRIOS CADASTRADOS NO PORTAL');
  
    const { rows } = await pool.query(`SELECT name,type,COALESCE(fk_id_broker, 0) AS fk_id_broker,cpf_cnpj,to_char(created_at , 'DD/MM/YYYY HH24:MI:SS') FROM users WHERE created_at >= date_trunc('day', NOW());`);
    const rowCount = rows.length;
    doc.text('TOTAL : '+ rowCount);

    rows.forEach((row) => {
      doc.moveDown();
      console.log(row);
      doc.text(`\n Nome: ${row.name}\n Tipo: ${row.type.type} \n FK: ${row.fk_id_broker} \n CPF/CNPJ: ${row.cpf_cnpj} \n Data Criação: ${row.to_char} `);
    });
  
    const buffers: any[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.end();
  
    return Buffer.concat(buffers);
  }

  export async function gerarPDF2(): Promise<Buffer> {
    const doc = new PDFDocument();
  
    doc.text('BROKERS CADASTRADOS');
  
    const { rows } = await pool.query(`SELECT name,cpf_cnpj,CASE WHEN active THEN 'Sim' ELSE 'Não' END AS active,COALESCE(email, 'Não informado') AS email,to_char(created_at , 'DD/MM/YYYY HH24:MI:SS') as "created_at" FROM brokers WHERE created_at >= date_trunc('day', NOW());`);
    const rowCount = rows.length;
    doc.text('TOTAL : '+ rowCount);

    rows.forEach((row) => {
      doc.moveDown();
      console.log(row);
      doc.text(`\n Nome: ${row.name}\n CPF/CNPJ: ${row.cpf_cnpj}\n Esta ativo? ${row.active}\n Email: ${row.email}\n Data Criação: ${row.created_at} `);
    });
  
    const buffers: any[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.end();
  
    return Buffer.concat(buffers);
  }

  export async function gerarPDF3(): Promise<Buffer> {
    const doc = new PDFDocument();
    
    doc.text('CADASTRO DE CONTRATO');
  

    const { rows } = await pool.query(`
    select 
    c.id, 
    b.name as "Corretor", 
    re.name as "Imob", 
    c2."name" as "Cliente",
    to_char(c.created_at , 'DD/MM/YYYY HH24:MI:SS') as "created_at"
    from contracts c
    inner join brokers b 
        on c.seller_id = b.id
    inner join real_estates re 
        on c.real_estate_id = re.id 
    inner join units u
        on c.unit_id = u.id
    inner join properties p 
        on c.unit_property_id = p.id
    inner join developers d
        on c.unit_property_developer_id = d.id
    inner join clients c2 
        on c.buyer_id = c2.id WHERE c.created_at >= date_trunc('day', NOW()) order by c.id desc;
    `);
    const rowCount = rows.length;
    doc.text('TOTAL : '+ rowCount);

    rows.forEach((row) => {
      doc.moveDown();
      console.log(row);
      doc.text(`\n Id: ${row.id}\n Corretor: ${row.Corretor} \n Imobiliária: ${row.Imob} \n Cliente: ${row.Cliente} \n Data Criação: ${row.created_at} `);
    });
  
    const buffers: any[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.end();
  
    return Buffer.concat(buffers);
  }
