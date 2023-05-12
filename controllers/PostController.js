import PostModel from '../models/PostModel.js'
import DTO from "./controller/DTO.js"
import AuthModel from "../models/AuthModel.js"
import Response from './controller/Response.js'

class AuthController {
	async createPost(req, res) {
		const { content, attachments } = req.body
		if(!content && !attachments) return res.status(400).json({'error': 'Missing content'})

		const user = await AuthModel.getUserByRequest(req)
		const result = await PostModel.createPost(user, content, attachments)
		
    Response(res, result)
	}

	async deletePost(req, res) {
		const dto = DTO(req, res, ["postid"])
    	if(dto.invalid) return;
    	const user = await AuthModel.getUserByRequest(req)
    	const { postid } = dto;

		const result = await PostModel.deletePost(user, postid)
    
    	Response(res, result)
	}

	async editPost(req, res) {
		
	}

	async getPost(req, res) {
		
	}
}

let arg = new AuthController()
export default arg