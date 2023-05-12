import DTO from "./controller/DTO.js"
import AuthModel from "../models/AuthModel.js"
import UserModel from "../models/UserModel.js"
import Response from './controller/Response.js'

class UserController {

  async changeUsername(req, res) {
    const dto = DTO(req, res, ["username"])
    if(dto.invalid) return;
    const { username } = dto
    const user = await AuthModel.getUserByRequest(req)
    const result = await UserModel.changeUsername(user, username)
    Response(res, result)
  }
  
  async changeFirstname(req, res) {
    const dto = DTO(req, res, ["firstname"])
    if(dto.invalid) return;
    const { firstname } = dto
    const user = await AuthModel.getUserByRequest(req)
    const result = await UserModel.changeFirstname(user, firstname)
    Response(res, result)
  }
  
  async changeLastname(req, res) {
    const dto = DTO(req, res, ["lastname"])
    if(dto.invalid) return;
    const { lastname } = dto
    const user = await AuthModel.getUserByRequest(req)
    const result = await UserModel.changeLastname(user, lastname)
    Response(res, result)
  }
  
  async changeDOB(req, res) {
    const dto = DTO(req, res, ["dob"])
    if(dto.invalid) return;
    const { dob } = dto
	  const user = await AuthModel.getUserByRequest(req)
    const result = await UserModel.changeDOB(user, dob)
    Response(res, result)
  }
  
  async changeBio(req, res) {
    const dto = DTO(req, res, ["bio"])
    if(dto.invalid) return;
    const { bio } = dto
    const user = await AuthModel.getUserByRequest(req)
    const result = await UserModel.changeBio(user, bio)
    Response(res, result, req)
  }
  
  async changePhoto(req, res) {
    if(!req.files) return Response(res, {"data": "Invalid photo", "status": 400})
    const { photo } = req.files
    if(!photo) return Response(res, {"data": "Invalid photo", "status": 400})
    const user = await AuthModel.getUserByRequest(req)
    const result = await UserModel.changePhoto(user, photo)
    Response(res, result, req)
  }
  
}

let arg = new UserController()
export default arg