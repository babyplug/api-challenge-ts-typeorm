
import * as passport from "passport";
import { ExtractJwt, Strategy} from "passport-jwt";
import { CONFIG } from "./Config.security";
import UserService from "../service/User.service";

passport.use(new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIG.SECRET
  }, async (jwtToken, done) => {
    const userService: UserService = new UserService()
    try {
      const user = await userService.getById(jwtToken.id)
      if (!user) return done(true, null)
      return done(null, user)
    } catch (error) {
      return done(error, null)
    }
  }
));
