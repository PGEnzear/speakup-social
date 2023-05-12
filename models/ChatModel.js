import { chatModel, userModel } from '../database/models/models.js'

class ChatModel {
  
	async createChat(user, name, members) {
    try {
    for(let userId of members) {
      const user = await userModel.findOne({
        id: userId
      })
      if(!user) return {"data":{"result": `user with id ${userId} not found`}}
    }

    console.log(user, name, members)
    
		const chat = await chatModel.create({
			owner: user.id,
			name,
      members
	  })

    if(chat) return {"data": 
			{"result": "Chat created successfully", "chatid": chat.id}, 
		"status": 200}
    else return {"data": 
			{"result": "Something went wrong"}, 
		"status": 500 }
    } catch(e) {
      console.log(e)
    }
	}

	async deleteChat(user, chatId) {
		const chat = await chatModel.findOne({
	      where: {
					id: chatId
	      }
		})
		
    if(!chat) return {"data": {"result": "Chat not found"}, "status": 404}
    if(user.id !== chat.owner) return {"data":{"result":"You are not the owner of this chat"}, "status": 403}
		await chatModel.destroy({
  		  where: {
  			  id: chatId
        }
      
		})
	  return {'data': {'result': 'Chat deleted successfully'}, 'status': 200}	
	}

	async getMessages(user, chatId, page) {
		const chat = await chatModel.findOne({
			where: {
				id: chatId
			},
      offset: page,
      limit: 50
		})

		console.log(chat.messages)
		
		if(!chat) return {"data": {"result": "Chat not found"}, "status": 404}
		if(!chat.members.includes(user.id)) return {"data":
			{"result": "You are not the member of this chat"}, 
		"status": 403}
		const result = await chatModel.findAll({
			attributes: [
				"messages"
			]
		})
		return {'data': result, 'status': 200}
	}
}

let arg = new ChatModel()
export default arg