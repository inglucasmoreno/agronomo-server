import { ApiProperty } from "@nestjs/swagger";

export class LoteUpdateDTO {

    @ApiProperty({ type: String, required: true, description: 'Descripcion de lote' })
    readonly descripcion: string;

    @ApiProperty({ type: String, required: true, description: 'Descripcion de lote' })
    readonly campo: string;

    @ApiProperty({ type: Array, required: true, description: 'Descripcion de lote' })
    readonly coordenadas: Array<any>;

    @ApiProperty({ type: Number, required: true, description: 'Superficie del lote' })
    readonly superficie: number;

    @ApiProperty({ type: String, required: true, description: 'Color de marcado en mapa' })
    readonly color: string;

    @ApiProperty({ type: String, required: true, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, required: true, description: 'Usuario actualizador' })
    readonly updatorUser: string;
    
    @ApiProperty({ type: Boolean, description: 'Estado de lote' })
    readonly activo: boolean;

}