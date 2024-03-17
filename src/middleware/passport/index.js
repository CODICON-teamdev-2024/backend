import passport from "passport"
import { localStrategy } from "./local/index.js";
import { jwtStrategy } from "./jwt/index.js";

passport.use(localStrategy);
passport.use(jwtStrategy);

export { passport }