import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CampoDTO {

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Descripcion del campo' })
    readonly descripcion: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Descripcion del campo' })
    readonly coordenadas: Array<any>;

    @IsNotEmpty()
    @ApiProperty({ type: Number, required: true, description: 'Superficie del campo' })
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
    
    @ApiProperty({ type: Boolean, description: 'Estado de campo' })
    readonly activo: boolean;

}