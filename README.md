# reportsdiary

ReportsDiary
API para consulta em banco de dados, gerar relatório da entrada de dados diários de uma empresa e envio por e-mail para  responsáveis envolvidos.

Instalação
Usar o NVM para controle de versão do Node.

Utilizar a versão 16.14.2 do node

yarn

yarn dev:server
npm install

npm run dev:server
Padrões de Projeto
Utilizar TDD, SOLID e DDD.

Testes deverão ser criados na pasta tests.

Criar as branches a partir da dev com o padrão:

feature/(nome da task)
fix/(nome da task) para hotfix e bugfix
Para prod o processo será da dev para a main.

Rotas
Criar as rotas com o prefixo V(número da versão)

ENV
copiar o .env.example para o .env.development

Build
yarn build
npm run build
Requisições
Importar a collection dentro da pasta docs no insomnia/postman
