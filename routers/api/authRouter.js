import AuthController from '../../controllers/AuthController.js'
import express from 'express'

class AuthRouter {

  router;
  
  init() {
    this.router = express.Router()
    
    this.router.post('/login', AuthController.login)
    this.router.post('/register', AuthController.register)
  }
  
}

let arg = new AuthRouter()
export default arg