import { DataTypes } from 'sequelize'
import applicationData from "../../app/applicationData.js"

class CommentModel {

  commentModel;

  init() {
    const sequelize = applicationData.databaseConnection

    this.commentModel = sequelize.define('Comment', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      author: {
        type: DataTypes.INTEGER,
        primaryKey: true 
      },
      text: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      attachments: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
    })
  }
}

let arg = new CommentModel()
export default arg;