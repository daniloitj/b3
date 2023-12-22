import express from 'express';
import path from 'path';
import payload from 'payload';
import { seed } from './core/seed';

require('dotenv').config()
const app = express()

app.use('/assets', express.static(path.resolve(__dirname, '../assets')))
app.get('/', (_, res) => {
  res.redirect('/admin');
});

app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {
  await payload.init({
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
    secret: process.env.PAYLOAD_SECRET,
  })

  if (process.env.PAYLOAD_SEED === 'true') {
    await seed(payload)
    process.exit()
  }

  app.listen(3000)
}

start()
