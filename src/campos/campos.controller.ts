import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CamposService } from './campos.service';
import { CampoUpdateDTO } from './dto/campo-update.dto';
import { CampoDTO } from './dto/campo.dto';

@ApiTags('campos')
@Controller('campos')
export class CamposController {

  constructor( private camposService: CamposService ){}

  // Campo por ID
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Campo obtenido correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de campo', type: 'string'})
  @Get('/:id')
  async getCampo(@Res() res, @Param('id') campoID) {
      const campo = await this.camposService.getCampo(campoID);
      res.status(HttpStatus.OK).json({
          message: 'Campos obtenido correctamente',
          campo
      });
  }

  // Listar campos
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de campos correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/')
  async listarCampos(@Res() res, @Query() querys) {
      const campos = await this.camposService.listarCampos(querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de campos correcto',
          campos
      });
  }

  // Crear campos
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Campo creado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiBody({ type: CampoDTO })
  @Post('/')
  async crearCampo(@Res() res, @Body() campoDTO: CampoDTO ) {       
      const campo = await this.camposService.crearCampo(campoDTO);        
      res.status(HttpStatus.CREATED).json({
          message: 'Campo creado correctamente',
          campo
      });
  }

  // Actualizar campo
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Campo actualizado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de campo', type: 'string'})
  @Put('/:id')
  async actualizarCampo(@Res() res, @Body() campoUpdateDTO: CampoUpdateDTO, @Param('id') campoID ) {
      const campo = await this.camposService.actualizarCampo(campoID, campoUpdateDTO);
      res.status(HttpStatus.OK).json({
          message: 'Campo actualizado correctamente',
          campo
      });
  }


  }
