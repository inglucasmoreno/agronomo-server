import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoteDTO {

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Descripcion de lote' })
    readonly descripcion: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Descripcion de lote' })
    readonly campo: string;

    @IsNotEmpty()
    @ApiProperty({ type: Array, required: true, description: 'Descripcion de lote' })
    readonly coordenadas: Array<any>;

    @IsNotEmpty()
    @ApiProperty({ type: Number, required: true, description: 'Superficie del lote' })
    readonly superficie: number;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Color de marcado en mapa' })
    readonly color: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;
    
    @ApiProperty({ type: Boolean, description: 'Estado de lote' })
    readonly activo: boolean;

}