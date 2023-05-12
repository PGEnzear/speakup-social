import express from "express"
import applicationData from "../../../app/applicationData.js"

class VkOauthRouter {

  passport;
  router;
  
  init() {
    this.router = express.Router()
    this.passport = applicationData.getPassport()

    this.router.get("/callback", (req, res) =>
        passport.authenticate("vkontakte", {
            successRedirect: "/api/oauth/vkontakte/auth-success",
            failureRedirect: '/api/oauth/vkontakte/auth-error'
        }) (req, res)
    );
  }
  
}

let arg = new VkOauthRouter()
export default arg