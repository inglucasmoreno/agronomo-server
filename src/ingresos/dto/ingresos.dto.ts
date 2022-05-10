import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class IngresoDTO {

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Numero de remito' })
    readonly nro_remito: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Identificador de proveedor' })
    readonly proveedor: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Identificador de campo' })
    readonly campo: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;
    
    @ApiProperty({ type: Boolean, description: 'Estado de ingreso' })
    readonly activo: boolean;

}