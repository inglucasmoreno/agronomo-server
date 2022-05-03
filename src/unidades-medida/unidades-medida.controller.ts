import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UnidadMedidaUpdateDTO } from './dto/unidad-medida-update.dto';
import { UnidadMedidaDTO } from './dto/unidad-medida.dto';
import { UnidadesMedidaService } from './unidades-medida.service';

@ApiTags('unidades-medida')
@Controller('unidades-medida')
export class UnidadesMedidaController {

  constructor( private unidadesMedidaService: UnidadesMedidaService ){}

    // Unidad de medida por ID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Unidad de medida obtenida correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de unidad de medida', type: 'string'})
    @Get('/:id')
    async getUnidad(@Res() res, @Param('id') unidadMedidaID) {
        const unidad = await this.unidadesMedidaService.getUnidad(unidadMedidaID);
        res.status(HttpStatus.OK).json({
            message: 'Unidad obtenida correctamente',
            unidad
        });
    }

    // Listar unidades de medida
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de unidades correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/')
    async listarUnidades(@Res() res, @Query() querys) {
        const unidades = await this.unidadesMedidaService.listarUnidades(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de unidades correcto',
            unidades
        });
    }

    // Crear unidad de medida
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'Unidad creada correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiBody({ type: UnidadMedidaDTO })
    @Post('/')
    async crearUnidad(@Res() res, @Body() unidadMedidaDTO: UnidadMedidaDTO ) {       
        const unidad = await this.unidadesMedidaService.crearUnidad(unidadMedidaDTO);        
        res.status(HttpStatus.CREATED).json({
            message: 'Unidad creada correctamente',
            unidad
        });
    }

    // Actualizar unidad de medida
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Unidad de medida actualizada correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de unidad de medida', type: 'string'})
    @Put('/:id')
    async actualizarUnidad(@Res() res, @Body() unidadMedidaUpdateDTO: UnidadMedidaUpdateDTO, @Param('id') unidadMedidaID ) {
        const unidad = await this.unidadesMedidaService.actualizarUnidad(unidadMedidaID, unidadMedidaUpdateDTO);
        res.status(HttpStatus.OK).json({
            message: 'Unidad medida actualizada correctamente',
            unidad
        });
    }
    
}
