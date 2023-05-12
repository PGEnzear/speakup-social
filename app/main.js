import { app, server } from "./app.configure.js"

import DatabaseConnector from '../database/db.js'
import applicationData from "./applicationData.js"

import WebSocketServer from "../websocket/wsServer.js"
import redisConnection from "../modules/redis/redis.js"

import { databaseModels } from "../database/models/models.js"

import PassportModule from '../modules/passport.js';

import * as dotenv from 'dotenv'

import Router from '../routers/router.js'

import { client as s3client } from "../modules/s3storage.js"

class Application {

  WS_PORT;
  port;
  wss;
  logger;
  server;
  app;
  applicationData;
  passport;

  async init() {
    PassportModule.init();
    this.passport = PassportModule.passport;
    
    dotenv.config()
    dotenv.config({ path:  '.env' })
    //PreInit
    try {
      DatabaseConnector.createConnection(
          process.env.DATABASE_database,
          process.env.DATABASE_user,
          process.env.DATABASE_password,
          process.env.DATABASE_host,
          process.env.DATABASE_port
      )

      this.WS_PORT = process.env.WS_PORT;
      this.port = process.env.PORT;
      this.server = server;
      this.app = app;
    } catch (e) {
      console.log(e)
    }
    //Init
    try {
      //Express
      app.use(this.passport.initialize());
      app.use(this.passport.session());
      applicationData.passport = this.passport
      console.log(applicationData)
      Router.init()
			app.use(Router.router)
      //S3
			s3client.login(process.env.S3_USERNAME, process.env.S3_PASSWORD)
      //WebSocket
      WebSocketServer.setPort(this.WS_PORT)
      //Database
      await DatabaseConnector.authenticate();
      applicationData.setDatabaseConnection(DatabaseConnector.databaseConnection)
      await databaseModels.connectEntities()
      //Logger
      this.logger = null//require('./logger/logger.js')
      //Redis
      applicationData.setRedisConnection(redisConnection.redisClient)
    } catch (e) {
      console.log(e)
    }
  }

  async startExpress() {
    const port = this.port
    return new Promise((resolve, reject) =>{
      this.server.listen(port, function() {
        console.log("[HTTP/S] Express server listening on port " + port);
        resolve()
      });
    })
  }
  
  async start() {
    try {
      await DatabaseConnector.connect();
      WebSocketServer.start()
      this.wss = WebSocketServer.wss
      console.log(this.wss)
      applicationData.setWsServer(this.wss)
      await this.startExpress()
    } catch (e) {
      console.log(e)
    }
  }
  
}

let arg = new Application()
export default arg;