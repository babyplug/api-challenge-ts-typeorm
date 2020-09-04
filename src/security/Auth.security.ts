import * as passport from "passport";
import { Request, Response, NextFunction } from "express";
import "../security/Passport.security"

export default class AuthSecurity {

  public authen(req: Request, res: Response, next: NextFunction){
    passport.authenticate("jwt", { session: false })(req, res, next)
  }

}

