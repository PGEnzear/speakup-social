import { messageModel, chatModel } from '../database/models/models.js'
import { Sequelize } from "sequelize"

class MessageModel {
  
	async createMessage(user, chatId, content, attachments) {

		const chat = await chatModel.findOne({
			where: {
				id: chatId
			}
		})

		if(!chat) return {"data": {"result": "Chat doesn't exist"}, "status": 404}
    
		if(!chat.members.includes(user.id)) return {"data": 
			{"result": "You're not the member of this chat"},
		"status": 403}
		
		const message = await messageModel.create({
			author: user.id,
			chat: chatId,
			content,
			attachments,
			UserId: user.id
		})

    if(!message) return { "data": {"result": "Something went wrong"}, "status": 500 }
    
		await chat.set({
			messages: Sequelize.fn('array_append', Sequelize.col("messages"), message.id),
		}).save()

     return { "data":
			{"result": "Message created successfully", "messageId": message.id},
		"status": 200}
	}

	async deleteMessage(user, messageId) {
		const message = await messageModel.findOne({
			where: {
				id: messageId
			}
		})

		if(!message) return {"data": {"result": "Message doesn't exist"}, "status": 404}
		if(user.id != message.author) return {"data": 
			{"result": "You're not permitted to delete this message"},
		"status": 403}

		await messageModel.destroy({
			where: {
				id: messageId
			}
		})

		return {'data': {'result': 'Message deleted successfully'}, 'status': 200}	
	}

	async editMessage(user, messageId, text) {
		const message = await messageModel.findOne({
			where: {
				id: messageId
			}
		})

		if(!message) return {"data": {"result": "Message doesn't exist"}, "status": 404}
		if(user.id != message.author) return {"data": 
			{"result": "You're not permitted to delete this message"},
		"status": 403}

		await message.set({
			content: text  
		}).save()

		return {'data': {'result': 'Message edited successfully'}, 'status': 200}	
	}
}

let arg = new MessageModel()
export default arg