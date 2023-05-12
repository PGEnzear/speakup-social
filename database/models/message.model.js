import { DataTypes } from 'sequelize'
import applicationData from "../../app/applicationData.js"

class MessageModel {

  messageModel

  init() {
    const sequelize = applicationData.databaseConnection

    this.messageModel = sequelize.define('Message', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      author: {
        type: DataTypes.INTEGER,
        required: true
      },
      chat: {
        type: DataTypes.INTEGER,
        required: true
      },
      content: {
        type: DataTypes.STRING,
        required: true
      },
      attachments: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      },
    })
  }
}

let arg = new MessageModel();
export default arg;