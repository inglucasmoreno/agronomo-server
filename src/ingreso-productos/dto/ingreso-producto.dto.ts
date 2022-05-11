import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class IngresoProductoDTO {

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Identificador de ingreso' })
    readonly ingreso: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Identificador de producto' })
    readonly producto: string;

    @IsNotEmpty()
    @ApiProperty({ type: Number, required: true, description: 'Cantidad' })
    readonly cantidad: number;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;
    
    @ApiProperty({ type: Boolean, description: 'Estado de ingreso' })
    readonly activo: boolean;

}