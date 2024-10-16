import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configuration from 'src/app/config/system/configuration';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService,
     @Inject(UserService.name) private userServ: UserService
     ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configuration().jwt.secret,
    });

  }
  async validate(payload:any) {
    const user = await this.userServ.findByUserName(payload.userName)
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }


}
