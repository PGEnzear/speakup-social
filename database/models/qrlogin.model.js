import { DataTypes } from 'sequelize'
import applicationData from "../../app/applicationData.js"

class QrLogin {

  qrLoginModel;

  init() {
    const sequelize = applicationData.databaseConnection

    this.qrLoginModel = sequelize.define('QrLogin', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      uuid: {
        type: DataTypes.STRING
      },
      sessionId: {
        type: DataTypes.STRING
      }
    })
  }
}

let arg = new  QrLogin()
export default arg;