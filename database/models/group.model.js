import { DataTypes } from 'sequelize'
import applicationData from "../../app/applicationData.js"

class GroupModel {

  groupModel;

  init() {
    const sequelize = applicationData.databaseConnection

    this.groupModel = sequelize.define('Group', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      photo: {
        type: DataTypes.STRING,
        defaultValue: "default.png"
      },
      owner: {
        type: DataTypes.INTEGER
      },
      members: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      },
      posts: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      }
    })
  }
}

let arg = new GroupModel()
export default arg;