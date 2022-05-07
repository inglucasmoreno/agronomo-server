import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ProveedorDTO {

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Descripcion del proveedor' })
    readonly descripcion: string;

    @ApiProperty({ type: String, required: true, description: 'Tipo de identificacion' })
    readonly tipo_identificacion: string;

    @ApiProperty({ type: String, required: true, description: 'Identificacion' })
    readonly identificacion: string;

    @ApiProperty({ type: String, required: true, description: 'Numero de telefono' })
    readonly telefono: string;

    @ApiProperty({ type: String, required: true, description: 'Direccion de proveedor' })
    readonly direccion: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;
    
    @ApiProperty({ type: Boolean, description: 'Estado de unidad' })
    readonly activo: boolean;

}