import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';

// Modificar el Secret en ENV
export const jwtSecret = 'hard!to-guess_secret';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'nest',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    NoteModule,
    TagModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
