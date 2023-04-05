import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "segredo",
    });
  }

  async validate(payload: any) {
    // const refreshToken = req.get("Authorization").replace("Bearer", "").trim();
    // return { ...payload, refreshToken };
    console.log(payload);
    console.log("teste jwt validate");
    return { email: payload.email };
  }
}
