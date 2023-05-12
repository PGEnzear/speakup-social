import jwt from "jsonwebtoken"
import { userModel } from "../database/models/models.js"

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token
    
    if(!token) return res.sendStatus(401)

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(decoded != undefined) {
        const id = decoded.id;
        const user = await userModel.findOne({
          where: {
            id
          }
        })
        if(user) {
          return next()
        } else {
          return res.sendStatus(401)
        }
    } else {
      return res.sendStatus(401)
    }
  } catch(e) {
    return res.sendStatus(401)
  }
}

export default auth