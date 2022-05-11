import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IngresoUpdateDTO } from './dto/ingresos-update.dto';
import { IngresoDTO } from './dto/ingresos.dto';
import { IngresosService } from './ingresos.service';

@ApiTags('ingresos')
@Controller('ingresos')
export class IngresosController {

  constructor( private ingresosService: IngresosService ){}

  // Ingreso por ID
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Ingreso obtenido correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de ingreso', type: 'string'})
  @Get('/:id')
  async getIngreso(@Res() res, @Param('id') ingresoID) {
      const ingreso = await this.ingresosService.getIngreso(ingresoID);
      res.status(HttpStatus.OK).json({
          message: 'Ingreso obtenido correctamente',
          ingreso
      });
  }

  // Listar ingreso
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de ingresos correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/')
  async listarIngresos(@Res() res, @Query() querys) {
      const ingresos = await this.ingresosService.listarIngresos(querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de ingresos correcto',
          ingresos
      });
  }

  // Crear ingreso
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Ingreso creado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiBody({ type: IngresoDTO })
  @Post('/')
  async crearIngreso(@Res() res, @Body() ingresoDTO: IngresoDTO ) {       
      const ingreso = await this.ingresosService.crearIngreso(ingresoDTO);        
      res.status(HttpStatus.CREATED).json({
          message: 'Ingreso creado correctamente',
          ingreso
      });
  }

  // Actualizar ingreso
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Ingreso actualizado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de ingreso', type: 'string'})
  @Put('/:id')
  async actualizarIngreso(@Res() res, @Body() ingresoUpdateDTO: IngresoUpdateDTO, @Param('id') ingresoID ) {
      const ingreso = await this.ingresosService.actualizarIngreso(ingresoID, ingresoUpdateDTO);
      res.status(HttpStatus.OK).json({
          message: 'Ingreso actualizado correctamente',
          ingreso
      });
  }

}
