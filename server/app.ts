import * as express from 'express'
import { Application } from 'express'

class App {
  public app: Application;
  public port: number;

  constructor (appInit: { port: number; middlewares: any; controllers: any }) {
    this.app = express()
    this.port = appInit.port

    this.assets()
    this.template()
    this.middlewares(appInit.middlewares)
    this.routes(appInit.controllers)
  }

  private middlewares (middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare)
    })
  }

  private routes (controllers: { forEach: (arg0: (controller: any) => void) => void }) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }

  private assets () {
    this.app.use('/static', express.static('dist'))
  }

  private template () {
    this.app.set('view engine', 'pug')
  }

  public listen () {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`)
    })
  }
}

export default App
