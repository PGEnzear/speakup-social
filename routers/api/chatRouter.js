import ChatController from '../../controllers/ChatController.js'
import express from 'express'

class ChatRouter {

  router;
  
  init() {
    this.router = express.Router()
    
    this.router.post('/createChat', ChatController.createChat)
    this.router.post('/deleteChat', ChatController.deleteChat)
    this.router.post('/addUsers', ChatController.addUsers)
    this.router.post('/deleteUsers', ChatController.deleteUsers)
    this.router.post('/changeName', ChatController.changeName)
    this.router.post('/changePhoto', ChatController.changePhoto)
    this.router.get('/getMessages', ChatController.getMessages)
  }
  
}

let arg = new ChatRouter()
export default arg