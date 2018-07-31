'use strict'

const koaStatic = require('koa-static-server')
const Router = require('koa-router')
const koaJson = require('koa-json')
const pkg = require('../package.json')
const checkController = require('./controllers/check')
const router = new Router()
const apiRouter = new Router()

// API Routing
apiRouter.use(koaJson({pretty: false, param: 'pretty'}))

apiRouter.get('/', (ctx) => {
  ctx.body = {
    env: ctx.app.env,
    author: 'Eywek',
    version: pkg.version
  }
})

apiRouter.get('/:login', checkController)

// Global routing (static)
router.get('/', koaStatic({rootDir: 'public', log: true}))

// Export routing
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())
module.exports = router
