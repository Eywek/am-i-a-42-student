'use strict'

const Koa = require('koa')
const app = new Koa()
const router = require('./src/routes')

// Setup routes
app
  .use(router.routes())
  .use(router.allowedMethods())

// Listen
app.listen(process.env.PORT, _ => {
  console.log(`Web server is listening on port ${process.env.PORT}`)
})
