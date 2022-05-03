import { ApiProperty } from "@nestjs/swagger";

export class ProductoUpdateDTO {

    @ApiProperty({ type: String, required: true, description: 'Descripcion de producto' })
    readonly descripcion: string;

    @ApiProperty({ type: String, required: true, description: 'Unidad de medida' })
    readonly unidad: string;

    @ApiProperty({ type: Boolean, required: true, description: 'Stock minimo - Flag' })
    readonly stock_minimo: boolean;

    @ApiProperty({ type: Number, required: true, description: 'Stock minimo - Flag' })
    readonly cantidad_minima: number;

    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;
    
    @ApiProperty({ type: Boolean, description: 'Estado de producto' })
    readonly activo: boolean;

}