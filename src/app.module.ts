import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtLocalModule } from './jwt_local/jwt-local.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/jwtDB'),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: {expiresIn: '365d'}
      }),
      inject: [ConfigService],
      global: true,
    }),
    JwtLocalModule
  ],
})
export class AppModule {}
