import { userModel } from '../database/models/models.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class AuthModel {

  async generateQrToken() {
    
  }

  async permitQrSession() {
    
  }

  async loginByQr() {
    
  }
  
	async login(user, password) {
    const JWT_SECRET = process.env.JWT_SECRET
    
		if(bcrypt.compareSync(password, user.password)) {
			const token = await jwt.sign({
        		id: user.id,
				email: user.email
			}, JWT_SECRET)
      return {"data": token, "status": 200, "cookies": [{"name": "token", "value": token}]}
		} else { return {'error': 'Invalid password', "status": 400} }
	}
  
	async createUser(firstName, lastName, email, password) {
      const saltRounds = process.env.saltRounds
    
      const candidate = await userModel.findOne({
        where: {
          email
        }
      })
      if(candidate) return {"error": "Email already in use", "status": 400}
	    const salt = bcrypt.genSaltSync(saltRounds)
	    const hashPassword = bcrypt.hashSync(password, salt)
    
		const user = await userModel.create({
			firstName,
			lastName,
			email,
			password: hashPassword,
			salt,
		})

	    return {"data": user}
	}

	async getUserByUsername(username) {
		const result = await userModel.findOne({
			where: {
				username
			}
		})
		if (!result) return {'error': "User doesn't exist", "status": 400}
		return result
	}

	async getUserByRequest(req) {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const result = await userModel.findOne({
      where: {
       	email: decoded.email 
      }
		})
		if (!result) return {'error': "User doesn't exist", "status": 400}
		return result
	}
  
	async getUserByEmail(email) {
		const result = await userModel.findOne({
      where: {
        email 
      }
		})
		if (!result) return {'error': "User doesn't exist", "status": 400}
		return result
	}
  
}

const arg = new AuthModel()
export default arg