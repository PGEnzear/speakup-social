import AuthModel from '../models/AuthModel.js'
import jwt from 'jsonwebtoken'
import DTO from "./controller/DTO.js"
import Response from "./controller/Response.js"
import { v4 as uuidv4 } from 'uuid';
import qr from '../modules/qrGenerator.js'

class AuthController {
  async generateQRToken(req, res) {
		
	}

	async loginQRToken(req, res) {
		
	}
  
	async login(req, res) {
    const dto = DTO(req, res, ["password"])
    if(dto.invalid) return;
    const { password } = dto
    const { username, email } = req.body;

    if(!(username || email)) return Response(res, {"error": "Username or email isn't provided"})
    
    let userResult;
    
    if(username) {
      userResult = await AuthModel.getUserByUsername(username)
    } else {
      userResult = await AuthModel.getUserByEmail(email)
    }
    
		if(userResult.error) return Response(res, userResult);

    const result = await AuthModel.login(userResult, password)

    Response(res, result)
	}

	async register(req, res) {
	    const dto = DTO(req, res, ["firstname", "lastname", "email", "password"])
	    if(dto.invalid) return;
	    const { firstname, lastname, email, password } = dto
	    const result = await AuthModel.createUser(firstname, lastname, email, password)
	    Response(res, result)
	}
}

let arg = new AuthController()
export default arg