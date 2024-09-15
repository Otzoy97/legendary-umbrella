import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportSerializer, PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { LogInAuthDto } from "../dto/signup-auth.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(loginAuthDto: LogInAuthDto): Promise<any> {
    const user = await this.authService.validateUser(loginAuthDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}