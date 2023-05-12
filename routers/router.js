import express from 'express'

import ApiRouter from "./api/router.js"
import UserapiRouter from "./userapi/router.js"

class AppRouter {

    router;
  
    apiRouter;
    userapiRouter;

    init() {
        ApiRouter.init()
        UserapiRouter.init()
        
        this.apiRouter = ApiRouter.router
        this.userapiRouter = UserapiRouter.router
      
        this.router = express.Router()

        this.router.use('/api', this.apiRouter)
        this.router.use('/userapi', this.userapiRouter)

        this.router.get("/version", (req, res) => {
          res.json({
            "type": "gate",
            "version": "1.1v",
            "remote": req.ip,
            "timestamp": new Date(),
            "now": Date.now()
          })
        })
      
        this.router.use(function(req, res, next) {
          console.log("event")
          res.status(404).json({ "data": "Content not found", "status": 400 });
        });
    }

}

let arg = new AppRouter()
export default arg