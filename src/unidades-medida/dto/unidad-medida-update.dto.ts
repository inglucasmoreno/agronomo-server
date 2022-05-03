import { ApiProperty } from "@nestjs/swagger";

export class UnidadMedidaUpdateDTO {

    @ApiProperty({ type: String, required: true, description: 'Descripcion de unidad de medida' })
    readonly descripcion: string;

    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;
    
    @ApiProperty({ type: Boolean, description: 'Estado de unidad' })
    readonly activo: boolean;

}