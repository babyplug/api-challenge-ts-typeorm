
import * as passport from "passport";
import { ExtractJwt, Strategy} from "passport-jwt";
import { CONFIG } from "./Config.security";

passport.use(new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIG.SECRET
  }, function (jwtToken, done) {
    return done(null, true)
  }
));
