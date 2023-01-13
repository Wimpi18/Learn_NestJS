import { JWTPayload } from './JWTPayload.model';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { jwtSecret } from 'src/app.module';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret //Modificar esto con ENV
        });
    }

    async validate(payload: JWTPayload) {
        const user = await this.authService.verifyToken(payload);
        if (!user) {
            return;
        }
        return user;
    }
}