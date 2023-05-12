import PostController from '../../controllers/PostController.js'
import express from 'express'

class PostRouter {

  router;
  
  init() {
    this.router = express.Router()
    
    this.router.post('/createPost', PostController.createPost)
    this.router.post('/deletePost', PostController.deletePost)
    this.router.post('/editPost', PostController.editPost)
    this.router.post('/getPost', PostController.getPost)
  }
  
}

let arg = new PostRouter()
export default arg