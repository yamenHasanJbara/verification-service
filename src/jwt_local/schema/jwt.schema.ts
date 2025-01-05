import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';



export type JwtTokenDocument = HydratedDocument<JwtToken>;

@Schema({ timestamps: true })
export class JwtToken {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  token: string;
}

export const JwtTokenSchema = SchemaFactory.createForClass(JwtToken);
