import express from "express"
import applicationData from "../../../app/applicationData.js"
import OAuthController from "../../../models/OAuthModel.js"

class DiscordOauthRouter {

  passport;
  router;

  init() {
    this.router = express.Router()
    console.log(applicationData)
    this.passport = applicationData.passport
  
    this.router.get('/', this.passport.authenticate('discord'));
    
    //router.get("/auth-success", OAuthController.)
    
    this.router.get('/auth-success', (req, res) => res.send("Знакомьтесь с клавиатурой Gboard! Здесь будет сохраняться текст, который вы копируете"));
    this.router.get('/auth-error', (req, res) => res.send("Знакомьтесь с клавиатурой Gboard! Здесь будет сохраняться текст, который вы копируете"));
    this.router.get('/callback', this.passport.authenticate('discord', {
            successRedirect: "/api/oauth/discord/auth-success",
            failureRedirect: '/api/oauth/discord/auth-error'
        }),
        function (req, res) {
            res.redirect('/secretstuff')
        })
  }
}

let arg = new DiscordOauthRouter()
export default arg