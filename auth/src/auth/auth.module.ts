import { JWTStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Global()
@Module({
  imports: [
    UserModule,
    JwtModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, JWTStrategy],
  exports: [AuthService, PassportModule, JWTStrategy],
  controllers: [AuthController],
})
export class AuthModule { }