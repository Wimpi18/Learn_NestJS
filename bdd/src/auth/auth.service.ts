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

        if (!user) {
            throw new UnauthorizedException("No se puede");
        }
        const token = this.generateToken(user);
        return token;
    }

    // Aqui se produce el problema del login por ese return comentado
    // Ver de mandar un mejor mensaje de error
    // Revisar porque se realizan tantas consultas similares en el backend
    async validateUser(usernameEnviado: string, passwordEnviado: string): Promise<any> {
        const user = await this.userService.validateUser(usernameEnviado);
        if (!user || user.password !== passwordEnviado) {
            throw new UnauthorizedException({ success: false, error: "Credenciales no válidas" });
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
        const token = {
            success: true,
            token: await this.jwtService.signAsync(payload, { secret: jwtSecret }),
            user: payload,
        }
        return token;
    }

    async verifyToken(payload: JWTPayload) {
        return this.userService.validateJWTPayload(payload);
    }
}