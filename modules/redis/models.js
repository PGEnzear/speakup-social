import applicationData from "../../app/applicationData.js"

const client = applicationData.getRedisConnection();

console.log(client)

const wsConnectionModel = require('./models/wsConnection.js')(client)

export  {
  wsConnectionModel
}