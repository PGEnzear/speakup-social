import ApplicationData from "../../app/applicationData.js"

import { DataTypes } from "sequelize"

import UserModel from "./user.model.js"
import PostModel from "./post.model.js"
import FileModel from "./file.model.js"
import ChatModel from "./chat.model.js"
import GroupModel from "./group.model.js"
import CommentModel from "./comment.model.js"
import MessageModel from "./message.model.js"
import QRLoginModel from "./qrlogin.model.js"

class DatabaseModels {

  userModel;
  postModel;
  fileModel;
  chatModel;
  groupModel;
  commentModel;
  messageModel;
  qRLoginModel;

  UserToChat;
  UserToGroup;

  connectEntities() {
    try {
      const sequelize = ApplicationData.databaseConnection
      
      if (!sequelize) return;
  
      UserModel.init()
      PostModel.init()
      FileModel.init()
      ChatModel.init()
      GroupModel.init()
      CommentModel.init()
      MessageModel.init()
      QRLoginModel.init()
  
      this.userModel = UserModel.userModel;
      this.postModel = PostModel.postModel;
      this.fileModel = FileModel.fileModel;
      this.chatModel = ChatModel.chatModel;
      this.groupModel = GroupModel.groupModel;
      this.commentModel = CommentModel.commentModel;
      this.messageModel = MessageModel.messageModel;
      this.qRLoginModel = QRLoginModel.qrLoginModel;
  
      this.UserToChat = sequelize.define("user_to_chat", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      })
  
      this.UserToGroup = sequelize.define("user_to_group", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      })
  
      this.userModel.belongsToMany(this.chatModel, { through: this.UserToChat })
      this.chatModel.belongsToMany(this.userModel, { through: this.UserToChat })
  
      this.userModel.belongsToMany(this.groupModel, { through: this.UserToGroup })
      this.groupModel.belongsToMany(this.userModel, { through: this.UserToGroup })
  
      this.chatModel.hasMany(this.messageModel)
      this.messageModel.belongsTo(this.chatModel)
  
      this.messageModel.hasMany(this.fileModel)
      this.fileModel.belongsTo(this.messageModel)
  
      this.messageModel.hasOne(this.userModel)
      this.userModel.belongsTo(this.messageModel)
  
      this.postModel.hasMany(this.commentModel)
      this.commentModel.belongsTo(this.postModel)
  
      this.postModel.hasMany(this.fileModel)
      this.fileModel.belongsTo(this.postModel)
  
      this.userModel.hasMany(this.postModel)
      this.postModel.belongsTo(this.userModel)
    } catch(e) {
      console.log(e)
    }
  }

}

const databaseModels = new DatabaseModels();

const userModel = databaseModels.userModel;
const postModel = databaseModels.postModel;
const fileModel = databaseModels.fileModel;
const chatModel = databaseModels.chatModel;
const groupModel = databaseModels.groupModel;
const commentModel = databaseModels.commentModel;
const messageModel = databaseModels.messageModel;

export {
  databaseModels,
  userModel,
  postModel,
  groupModel,
  chatModel,
  fileModel,
  commentModel,
  messageModel
}