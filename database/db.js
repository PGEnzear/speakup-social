import {Sequelize} from 'sequelize'

class DatabaseConnector {

  databaseConnection;

  createConnection(database, user, password, host, port) {
    console.log("[Database] Creating connection")
    this.databaseConnection = new Sequelize(
      database,
      user,
      password, {
          dialect: 'postgres',
          host,
          port
      }
    )
  }

  async authenticate() {
    console.log("[Database] Authenticating connection")
    if(this.databaseConnection) {
      await this.databaseConnection.authenticate()
    }
  }
  
  async connect() {
    console.log("[Database] Connecting")
    if(this.databaseConnection) {
      await this.databaseConnection.sync()
    }
  }

  getConnection() {
    return this.databaseConnection;
  }
  
}

let arg = new DatabaseConnector()
export default arg;