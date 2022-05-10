import { ApiProperty } from "@nestjs/swagger";

export class StockCamposUpdateDTO {

    @ApiProperty({ type: String, required: true, description: 'Identificacion de campo' })
    readonly campo: string;

    @ApiProperty({ type: String, required: true, description: 'Identificacion de producto' })
    readonly producto: string;

    @ApiProperty({ type: Number, required: true, description: 'Cantidad del producto' })
    readonly cantidad: number;

    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;
    
    @ApiProperty({ type: Boolean, description: 'Estado de stock' })
    readonly activo: boolean;

}