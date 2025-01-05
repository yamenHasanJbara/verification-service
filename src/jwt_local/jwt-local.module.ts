import { Module } from '@nestjs/common';
import { JwtLocalController } from './jwt-local.controller';
import { JwtLocalService } from './jwt-local.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtToken, JwtTokenSchema } from './schema/jwt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: JwtToken.name, schema: JwtTokenSchema}]),

  ],
  controllers: [JwtLocalController],
  providers: [JwtLocalService],
})
export class JwtLocalModule {}
