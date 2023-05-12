import { DataTypes } from 'sequelize'
import applicationData from "../../app/applicationData.js"

class PostModel {

  postModel;

  init() {
    const sequelize = applicationData.databaseConnection;

    this.postModel = sequelize.define('Post', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      textContent: {
        type: DataTypes.STRING,
      },
      likes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      }
    })
  }
}

let arg = new  PostModel()
export default arg;