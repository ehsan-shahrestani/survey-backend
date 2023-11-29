import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService , UserService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class AuthModule {}
