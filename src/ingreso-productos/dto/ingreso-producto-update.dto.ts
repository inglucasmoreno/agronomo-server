import { ApiProperty } from "@nestjs/swagger";

export class IngresoProductoUpdateDTO {

    @ApiProperty({ type: String, required: true, description: 'Identificador de ingreso' })
    readonly ingreso: string;

    @ApiProperty({ type: String, required: true, description: 'Identificador de producto' })
    readonly producto: string;

    @ApiProperty({ type: Number, required: true, description: 'Cantidad' })
    readonly cantidad: number;

    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;
    
    @ApiProperty({ type: Boolean, description: 'Estado de ingreso' })
    readonly activo: boolean;

}