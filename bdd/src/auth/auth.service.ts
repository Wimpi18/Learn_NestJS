import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/app.module';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JWTPayload } from './JWTPayload.model';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService, // Libreria externa
    ) { }

    async singIn(username: string, password: string): Promise<string> {
        const user = await this.validateUser(username, password);
        const token = this.generateToken(user);

        return token;
    }

    async validateUser(emailOrPhone: string, passwordEnviado: string): Promise<any> {
        const unauthorizedException = { error: "Credenciales no válidas", success: false };
        const user = await this.userService.validateUser(emailOrPhone);
        if (!user || user.password !== passwordEnviado) {
            return unauthorizedException;
            // throw new UnauthorizedException('by username or password');
        }
        const result = user;
        delete result.password; // Enviamos nuestro usuario sin el password
        return result;
    }

    async generateToken(user: User): Promise<any> {
        const payload: JWTPayload = {
            userID: user.userID,
            usernameID: user.username,
        };

        // La libreria jwtService se encarga de crear el Token con el signAsync
        const token = await this.jwtService.signAsync(payload, { secret: jwtSecret });
        const newToken = {
            success: true,
            token: token,
            user: payload,
        }
        return newToken;
    }

    async verifyToken(payload: JWTPayload) {
        return this.userService.validateJWTPayload(payload);
    }
}