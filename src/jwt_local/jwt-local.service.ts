import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtToken } from './schema/jwt.schema';
import { StoreJwtDto } from './dto/store-jwt.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';
import { ValidateTokenRequest } from './dto/validate-token-request.dto';


@Injectable()
export class JwtLocalService {
  constructor(
    @InjectModel(JwtToken.name) private readonly jwtModel: Model<JwtToken>,
    private jwtService: JwtService
  ){}

  /**
   * 
   * 1- find the old token and delete anyway if we hit the login api more than once.
   * 2- store the new token.
   * @param storeJwtDto 
   * @returns 
   */
  async storeJwt(storeJwtDto: StoreJwtDto) {
    try {
       await this.jwtModel.findOneAndDelete({
        userId: storeJwtDto.id
       });

      const savedToken = await this.jwtModel.create({
        userId: storeJwtDto.id,
        token: storeJwtDto.jwt
      });
      savedToken.save();

      return {
        status: true,
        message: 'Token saved successfully'
      }
    } catch (error) {
      return {
        status: false,
        message: 'Something went wrong, Please try again later!'
      }
    }
  }
  /**
   * 
   * 1- validate token depending on the verifyAsync function so here the object will have the exp: params which refere if the token is valid or not.
   * 
   * @param validateTokenRequest 
   * @returns 
   */
  async validateToken(validateTokenRequest: ValidateTokenRequest) {
    try {
      const payload = await this.jwtService.verifyAsync(
        validateTokenRequest.jwt,
        {
          secret: jwtConstants.secret
        }
      );

      if ('exp' in payload) {
        return {
          status: true,
          message: 'Token is still valid',
          data: payload
        }
      }
  
    } catch (error) {
      return {
        status: false,
        message: 'Token is invalid, Please login in the system'
      }
    }
  }
}
