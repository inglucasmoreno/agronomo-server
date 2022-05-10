import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class StockCamposDTO {

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Identificacion de campo' })
    readonly campo: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Identificacion de producto' })
    readonly producto: string;

    @IsNotEmpty()
    @ApiProperty({ type: Number, required: true, description: 'Cantidad del producto' })
    readonly cantidad: number;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;
    
    @ApiProperty({ type: Boolean, description: 'Estado de stock' })
    readonly activo: boolean;

}