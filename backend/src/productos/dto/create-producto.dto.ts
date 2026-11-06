import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min } from "class-validator";

export class CreateProductoDto {
    @ApiProperty({example:'Nombre'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre:string;

    @ApiProperty({example:'Descripcion'})
    @IsString()
    @IsOptional()
    descripcion:string;

    @ApiProperty({example:'3.50'})
    @IsNumber({maxDecimalPlaces:12})
    @IsPositive()
    precio:number;

    @ApiProperty({example:'25', default:0})
    @IsInt()
    @Min(0)
    @IsOptional()
    stock?:number;

    @ApiProperty({example:true, default:true})
    @IsBoolean()
    @IsOptional()
    activo?:boolean;
}
