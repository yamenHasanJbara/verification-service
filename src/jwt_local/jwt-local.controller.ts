import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { StoreJwtDto } from './dto/store-jwt.dto';
import { JwtLocalService } from './jwt-local.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { ValidateTokenRequest } from './dto/validate-token-request.dto';



@Controller('jwt')
export class JwtLocalController {

  constructor(
    private readonly jwtLocalService: JwtLocalService,
    private readonly configService: ConfigService
  ){}

  /**\
   * 1- here we are sending a key from the aut service, so this key is hashed, and we use this key to check if the request is secure or not.
   */
  @Post('save')
  async save(@Body() storeJwtDto: StoreJwtDto)
  {
    const secretKey = this.configService.get<string>('CONNECTION_KEY_BETWEEN_SERVICE');
    if (!await bcrypt.compare(secretKey, storeJwtDto.secret_key)) {
      return {
        status: false,
        message: 'Request coming from unsecure services'
      }
    }
    return await this.jwtLocalService.storeJwt(storeJwtDto);
  }


  @Post('check-token')
  async checkToken(@Body() validateTokenRequest: ValidateTokenRequest){
    return await this.jwtLocalService.validateToken(validateTokenRequest);
  }
}
