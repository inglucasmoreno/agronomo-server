import { ApiProperty } from "@nestjs/swagger";

export class CampoUpdateDTO {

    @ApiProperty({ type: String, required: true, description: 'Descripcion del campo' })
    readonly descripcion: string;

    @ApiProperty({ type: String, required: true, description: 'Descripcion del campo' })
    readonly coordenadas: Array<any>;

    @ApiProperty({ type: Number, required: true, description: 'Superficie del campo' })
    readonly superficie: number;

    @ApiProperty({ type: String, required: true, description: 'Color de marcado en mapa' })
    readonly color: string;

    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;
    
    @ApiProperty({ type: Boolean, description: 'Estado de campo' })
    readonly activo: boolean;

}