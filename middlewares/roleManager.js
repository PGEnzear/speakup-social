import jwt from "jsonwebtoken"
import { userModel } from "../database/models/models.js"
import AuthModel from "../models/AuthModel.js"

const roleManager = (role) => async (req, res, next) => {
  try {
    const user = await AuthModel.getUserByRequest(req)

    if(!user) return res.sendStatus(401)

    if(user.role === role) {
      
    }
  } catch(e) {
    return res.sendStatus(401)
  }
}

export default roleManager