import MessageModel from '../models/MessageModel.js'
import DTO from "./controller/DTO.js"
import Response from './controller/Response.js'
import AuthModel from "../models/AuthModel.js"

class MessageController {
  
	async sendMessage(req, res) {
    try {
  		const dto = DTO(req, res, ["chatid", "message"])
      if(dto.invalid) return
      const { chatid, message } = dto
  		const user = await AuthModel.getUserByRequest(req)
  		const result = await MessageModel.createMessage(user, chatid, message)
  		
      Response(res, result)
    } catch(e) {
      console.warn(e)
    }
	}

	async deleteMessage(req, res) {
    try {
      const dto = DTO(req, res, ["messageid"])
      if(dto.invalid) return
      const { messageid } = dto
  
      const user = await AuthModel.getUserByRequest(req)
      const result = await MessageModel.deleteMessage(user, messageid)
      
      Response(res, result)
    } catch(e) {
      console.warn(e)
    }
	}

	async editMessage(req, res) {
		try {
      const dto = DTO(req, res, ["messageid", "text"])
			if(dto.invalid) return
			const { messageid, text } = dto

			const user = await AuthModel.gegetUserByRequest(req)
			const result = MessageModel.editMessage(user, messageid, text)

			Response(res, result)
    } catch(e) {
      console.log(e)
    }
	}

}

let arg = new MessageController()
export default arg