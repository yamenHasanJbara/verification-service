import { IsEmail, IsNotEmpty } from "class-validator";

export class StoreJwtDto {

    @IsNotEmpty()
    id: string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    jwt:string

    @IsNotEmpty()
    secret_key:string

}