import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class PaginacionDto{
    @ApiPropertyOptional({default:1})
    @Type(()=> Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    pagina : number = 1;

    @ApiPropertyOptional({default:10, maximum:100})
    @Type(()=> Number)
    @IsInt()
    @Min(1)
    @Max(100)
    @IsOptional()
    limite : number = 10;

    @ApiPropertyOptional({description:'Texto para buscar'})
    @IsString()
    @IsOptional()
    buscar? : number = 10;
}