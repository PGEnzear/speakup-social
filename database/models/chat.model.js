import { DataTypes } from 'sequelize'
import applicationData from "../../app/applicationData.js"

class ChatModel {

  chatModel;

  init() {
    const sequelize = applicationData.databaseConnection

    this.chatModel = sequelize.define('Chat', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      secret: {
        type: DataTypes.STRING
      },
      attachments: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: "New group"
      },
      photo: {
        type: DataTypes.STRING,
        defaultValue: "default.png"
      },
      owner: {
        type: DataTypes.INTEGER,
      },
      members: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      },
      messages: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      }
    })
  }
}

let arg = new ChatModel()
export default arg;