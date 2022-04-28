import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UnidadMedidaDTO {

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Descripcion de unidad de medida' })
    readonly descripcion: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;
    
    @ApiProperty({ type: Boolean, description: 'Estado de provincia' })
    readonly activo: boolean;

}