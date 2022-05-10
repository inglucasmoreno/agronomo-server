import { ApiProperty } from "@nestjs/swagger";

export class IngresoUpdateDTO {

    @ApiProperty({ type: String, required: true, description: 'Numero de remito' })
    readonly nro_remito: string;

    @ApiProperty({ type: String, required: true, description: 'Identificador de proveedor' })
    readonly proveedor: string;

    @ApiProperty({ type: String, required: true, description: 'Identificador de campo' })
    readonly campo: string;

    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;
    
    @ApiProperty({ type: Boolean, description: 'Estado de ingreso' })
    readonly activo: boolean;

}