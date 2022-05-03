import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoteUpdateDTO } from './dto/lotes-update.dto';
import { LoteDTO } from './dto/lotes.dto';
import { LotesService } from './lotes.service';

@ApiTags('lotes')
@Controller('lotes')
export class LotesController {

  constructor( private lotesService: LotesService ){}

    // Lote por ID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Lote obtenido correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de lote', type: 'string'})
    @Get('/:id')
    async getLotes(@Res() res, @Param('id') loteID) {
        const lote = await this.lotesService.getLote(loteID);
        res.status(HttpStatus.OK).json({
            message: 'Lote obtenido correctamente',
            lote
        });
    }

    // Lotes por campo
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Lotes obtenidos correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de campo', type: 'string'})
    @Get('/campo/:id')
    async getLotesPorCampo(@Res() res, @Param('id') campoID, @Query() querys) {
        const lotes = await this.lotesService.getLotePorCampo(campoID, querys);
        res.status(HttpStatus.OK).json({
            message: 'Lote obtenido correctamente',
            lotes
        });
    }

    // Listar lotes
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de lotes correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/')
    async listarLotes(@Res() res, @Query() querys) {
        const lotes = await this.lotesService.listarLotes(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de lotes',
            lotes
        });
    }

    // Crear lote
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'Lote creado correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiBody({ type: LoteDTO })
    @Post('/')
    async crearLote(@Res() res, @Body() loteDTO: LoteDTO ) {       
        const lote = await this.lotesService.crearLote(loteDTO);        
        res.status(HttpStatus.CREATED).json({
            message: 'Lote creado correctamente',
            lote
        });
    }

    // Actualizar lote
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Lote actualizado correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de lote', type: 'string'})
    @Put('/:id')
    async actualizarLote(@Res() res, @Body() loteUpdateDTO: LoteUpdateDTO, @Param('id') loteID) {
        const lote = await this.lotesService.actualizarLote(loteID, loteUpdateDTO);
        res.status(HttpStatus.OK).json({
            message: 'Lote actualizado correctamente',
            lote
        });
    }


}
