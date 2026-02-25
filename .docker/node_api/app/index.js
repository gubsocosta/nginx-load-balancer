const express = require('express');
const pino = require('pino');
const pinoHttp = require('pino-http');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info'
});

const app = express();
const port = process.env.PORT || 3000;

// pino-http injeta req.log e faz logs de HTTP para stdout
app.use(pinoHttp({ logger }));

app.get('/', (req, res) => {
  req.log.info('GET / chamado');
  res.json({ message: 'Olá do Node + Docker Compose!' });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/users', (req, res) => {
  req.log.info('Listando usuários');
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
});

app.post('/echo', (req, res) => {
  req.log.info({ body: req.body }, 'echo');
  res.json({ received: req.body });
});

const server = app.listen(port, () => {
  logger.info({ port }, 'API rodando');
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM recebido — fechando servidor');
  server.close(() => process.exit(0));
});