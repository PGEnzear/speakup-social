import express from 'express'
import fs from 'fs'
import https from 'https'
import http from "http"
import helmet from 'helmet'
import bodyParser from 'body-parser'
import session from "express-session"
import fileUpload from 'express-fileupload'
import cookieParser from "cookie-parser"

import requestIp from '../utils/request-ip.js'
import errorHandler from "../utils/errorHandler.js"

import applicationData from "./applicationData.js"

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const options = {
  key: fs.readFileSync(path.join(__dirname, '../ssl/private.key'), 'utf8'),
  cert: fs.readFileSync(path.join(__dirname, '../ssl/public.cert'), 'utf8')
};

const app = express()

app.use(requestIp.mw())
app.use(fileUpload())

app.use(helmet());
app.set('trust proxy', 1)

if (process.env.USESSL == "true") {
  var server = https.createServer(options, app)
} else {
  var server = http.createServer({}, app)
}

app.use(cookieParser())

const SESSION_SECRET = process.env.SESSION_SECRET

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    httpOnly: true
  }
}))

app.use(bodyParser.json())

app.use(errorHandler);

applicationData.setExpressServer(server)

export {
  app,
  server
}