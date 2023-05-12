import UserController from '../../controllers/UserController.js'
import express from 'express'

class UserRouter {

  router;
  
  init() {
    this.router = express.Router()

    this.router.post('/changePhoto', UserController.changePhoto)
    this.router.post('/changeBio', UserController.changeBio)
    this.router.post('/changeLastname', UserController.changeLastname)
    this.router.post('/changeFirstname', UserController.changeFirstname)
    this.router.post('/changeUsername', UserController.changeUsername)
    this.router.post('/changeDOB', UserController.changeDOB)
  }
  
}

let arg = new UserRouter()
export default arg