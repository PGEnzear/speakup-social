import ChatModel from '../models/ChatModel.js'
import DTO from "./controller/DTO.js"
import Response from './controller/Response.js'
import AuthModel from "../models/AuthModel.js"

class ChatController {
	async createChat(req, res) {
    try {
  		const dto = DTO(req, res, ["chatname", "members"])
      if(dto.invalid) return;
      const { chatname, members } = dto
  		const user = await AuthModel.getUserByRequest(req)
  		const result = await ChatModel.createChat(user, chatname, members)
  		
      Response(res, result)
    } catch(e) {
      console.warn(e)
    }
	}

	async deleteChat(req, res) {
    try {
      const dto = DTO(req, res, ["chatid"])
      if(dto.invalid) return;
      const { chatid } = dto;
      
  
      const user = await AuthModel.getUserByRequest(req)
      const result = await ChatModel.deleteChat(user, chatid)
      
      Response(res, result)
    } catch(e) {
      console.warn(e)
    }
	}

  async changePhoto(req, res) {
    
  }

  async changeName(req, res) {
    
  }
  
	async changeChatName(req, res) {
		try {
      
    } catch(e) {
      console.log(e)
    }
	}

  async deleteUsers(req, res) {
    
  }

	async addUsers(req, res) {
		try {
  		const dto = DTO(req, res, ["chatid", "members"])
      if(dto.invalid) return
      const { chatid, members } = dto
  		const user = await AuthModel.getUserByRequest(req)
  		const result = await ChatModel.createChat(user, chatid, members)
  		
      Response(res, result)
    } catch(e) {
      console.warn(e)
    }
	}

	async getMessages(req, res) {
		const dto = DTO(req, res, ["chatid", "page"])
		if(dto.invalid) return
		const { chatid, page } = dto
		const user = await AuthModel.getUserByRequest(req)
		const result = await ChatModel.getMessages(user, chatid, page)

		Response(res, result)
	}
	
}

let arg = new ChatController()
export default arg;