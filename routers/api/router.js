import express from 'express'

import AuthRouter from './authRouter.js'
import PostRouter from './postRouter.js'
import UserRouter from './userRouter.js'
import ChatRouter from './chatRouter.js'
import OauthRouter from './oauthRouter.js'
import MessageRouter from './messageRouter.js'

import authOnly from "../../middlewares/authOnly.js"

import cors from 'cors'
import csrf from 'csurf'

class AppAPIRouter {

    router;
  
    authRouter;
    postRouter;
    userRouter;
    chatRouter;
    oauthRouter;
    messageRouter;

    init() {
        AuthRouter.init()
        PostRouter.init()
        UserRouter.init()
        ChatRouter.init()
        OauthRouter.init()
        MessageRouter.init()
        
        this.authRouter = AuthRouter.router
        this.postRouter = PostRouter.router
        this.userRouter = UserRouter.router
        this.chatRouter = ChatRouter.router
        this.oauthRouter = OauthRouter.router
        this.messageRouter = MessageRouter.router
      
        this.router = express.Router()

        this.router.use('/auth', this.authRouter)
        this.router.use('/oauth', this.oauthRouter)

        this.router.use('/post', [authOnly], this.postRouter)
        this.router.use('/user', [authOnly], this.userRouter)
        this.router.use('/chat', [authOnly], this.chatRouter)
        this.router.use('/message', [authOnly], this.messageRouter)

        if (process.env.MODE === "PRODUCTION") {
          this.router.use(csrf({ cookie: true }));
        
          this.router.use(function(req, res, next) {
            res.locals.csrfToken = req.csrfToken();
            next();
          });
        }
        
        this.router.use(cors({
          origin: '*'
        }));
      
        this.router.get("/version", (req, res) => {
          res.json({
            "type": "api",
            "version": "1.1v",
            "remote": req.ip,
            "timestamp": new Date(),
            "now": Date.now()
          })
        })
    }

}

let arg = new AppAPIRouter()
export default arg