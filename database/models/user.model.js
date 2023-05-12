import { DataTypes } from 'sequelize'
import applicationData from "../../app/applicationData.js"

class UserModel {

    userModel;

  init() {
    const sequelize = applicationData.databaseConnection

    this.userModel = sequelize.define('User', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        username: {
          type: DataTypes.STRING,
          unique: false,
          allowNull: true
        },
        role: {
          type: DataTypes.ENUM(['user', 'admin', "moderator", "dolbaeb"]),
          defaultValue: "user"
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        bio: {
          type: DataTypes.STRING,
          defaultValue: "Hello! I am using speakup"
        },
        gender: {
          type: DataTypes.STRING,
          defaultValue: "unselected"
        },
        dob: {
          type: DataTypes.DATE,
        },
        photo: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "undefined.png"
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        salt: {
          type: DataTypes.STRING,
          allowNull: false
        },
        emailVerificationToken: {
          type: DataTypes.STRING,
        },
        isEmailVerified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        discordId: {
          type: DataTypes.STRING,
          unique: true
        },
        vkId: {
          type: DataTypes.STRING,
          unique: true
        },
        telegramId: {
          type: DataTypes.STRING,
          unique: true
        }
      },
      {
        timestamps: true,
        paranoid: true,
      })
  }
}

let arg = new UserModel();
export default arg;