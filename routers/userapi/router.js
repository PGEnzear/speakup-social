import express from 'express'

class UserapiRouter {

    router;

    init() {
        this.router = express.Router()
      
        this.router.get("/version", (req, res) => {
          res.json({
            "type": "userapi",
            "version": "1.1v",
            "remote": req.ip,
            "timestamp": new Date(),
            "now": Date.now()
          })
        })
    }

}

let arg = new UserapiRouter()
export default arg