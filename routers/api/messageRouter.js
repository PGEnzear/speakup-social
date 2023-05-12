import express from "express"
import MessageController from "../../controllers/MessageController.js"

class MessageRouter {

  router;
  
  init() {
    this.router = express.Router()
    
    this.router.post('/sendMessage', MessageController.sendMessage)
    this.router.post('/deleteMessage', MessageController.deleteMessage)
    this.router.post('/editMessage', MessageController.editMessage)
  }
  
}

let arg = new MessageRouter()
export default arg