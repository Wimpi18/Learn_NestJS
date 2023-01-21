import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // Vamos a acceder o hacer Login
  @Post('singIn')
  create(
    @Body() { username, password }: { username: string; password: string },
  ) {
    console.log({ username, password });
    return this.authService.singIn(username, password);
  }
}