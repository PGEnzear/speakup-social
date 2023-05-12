import { Strategy as VKontakteStrategy } from"passport-vkontakte"
import { Strategy as DiscordStrategy } from 'passport-discord'

import passport from 'passport'
import applicationData from "../app/applicationData.js";

const scopes = ['identify', 'email', 'guilds', 'guilds.join'];

class PassportModule {

    passport;

    constructor() {
        this.passport = passport
    }

    serializeUser(user, done) {
        done(null, user)
    }

    deserializeUser(obj, done) {
        done(null, obj.id);
    }

    init() {
        applicationData.passport = this.passport
        this.passport.use(
            new VKontakteStrategy(
                {
                    clientID: process.env.VKONTAKTE_APP_ID,
                    clientSecret: process.env.VKONTAKTE_APP_SECRET,
                    callbackURL: process.env.VKONTAKTE_CALLBACKURL,
                },
                function myVerifyCallbackFn(accessToken, refreshToken,params,profile,done) {
                    console.log(profile)

                    done(null, profile);
                }
            )
        );

        this.passport.use(
            new DiscordStrategy(
                {
                    clientID: process.env.DISCORD_APP_ID,
                    clientSecret: process.env.DISCORD_APP_SECRET,
                    callbackURL: process.env.DISCORD_CALLBACKURL,
                    scope: scopes
                },
                function(accessToken, refreshToken, profile, cb) {
                    return cb(null, profile);
                }
            ))
    }
}

let arg = new PassportModule()
export default arg;