import { IsNotEmpty } from "class-validator";

export class ValidateTokenRequest {
    @IsNotEmpty()
    jwt:string
}