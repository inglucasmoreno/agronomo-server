import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ProductoDTO {

    @ApiProperty({ type: String, required: true, description: 'Codigo de producto' })
    readonly codigo: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Descripcion de producto' })
    readonly descripcion: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Unidad de medida' })
    readonly unidad: string;

    @IsNotEmpty()
    @ApiProperty({ type: Boolean, required: true, description: 'Stock minimo - Flag' })
    readonly stock_minimo: boolean;

    @ApiProperty({ type: Number, required: true, description: 'Stock minimo - Flag' })
    readonly cantidad_minima: number;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;
    
    @ApiProperty({ type: Boolean, description: 'Estado de producto' })
    readonly activo: boolean;

}