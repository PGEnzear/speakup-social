import express from 'express'

import discord_oauth from "./oauth/discord_oauth.js"
import vk_oauth from "./oauth/vk_oauth.js"
import telegram_oauth from "./oauth/telegram_oauth.js"

class OauthRouter {

  router;
  
  init() {
    discord_oauth.init()
    vk_oauth.init()
    
    this.router = express.Router()
    
    this.router.use("/discord", discord_oauth.router)
    this.router.use("/vkontakte", vk_oauth.router)
    this.router.use("/telegram", telegram_oauth)
  }
  
}



let arg = new OauthRouter()
export default arg