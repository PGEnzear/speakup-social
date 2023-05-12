import { DataTypes } from 'sequelize'
import applicationData from "../../app/applicationData.js"

class FileModel {

  fileModel;

  init() {
    const sequelize = applicationData.databaseConnection

    this.fileModel = sequelize.define('File', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
  }
}

let arg = new FileModel();
export default arg