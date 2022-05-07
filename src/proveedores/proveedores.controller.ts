import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProveedorUpdateDTO } from './dto/proveedor-update.dto';
import { ProveedorDTO } from './dto/proveedor.dto';
import { ProveedoresService } from './proveedores.service';

@ApiTags('proveedores')
@Controller('proveedores')
export class ProveedoresController {
  
  constructor( private proveedoresService: ProveedoresService ){}

  // Proveedores por ID
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Proveedor obtenido correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de proveedor', type: 'string'})
  @Get('/:id')
  async getProveedor(@Res() res, @Param('id') proveedorID) {
      const proveedor = await this.proveedoresService.getProveedor(proveedorID);
      res.status(HttpStatus.OK).json({
          message: 'Proveedor obtenido correctamente',
          proveedor
      });
  }

  // Listar proveedores
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de proveedores' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/')
  async listarProveedores(@Res() res, @Query() querys) {
      const proveedores = await this.proveedoresService.listarProveedores(querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de proveedores',
          proveedores
      });
  }

  // Crear proveedor
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Proveedor creado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiBody({ type: ProveedorDTO })
  @Post('/')
  async crearProveedor(@Res() res, @Body() proveedorDTO: ProveedorDTO ) {       
      const proveedor = await this.proveedoresService.crearProveedor(proveedorDTO);        
      res.status(HttpStatus.CREATED).json({
          message: 'Proveedor creado correctamente',
          proveedor
      });
  }

  // Actualizar proveedor
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Proveedor actualizado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de proveedor', type: 'string'})
  @Put('/:id')
  async actualizarProveedor(@Res() res, @Body() proveedorUpdateDTO: ProveedorUpdateDTO, @Param('id') proveedorID ) {
      const proveedor = await this.proveedoresService.actualizarProveedor(proveedorID, proveedorUpdateDTO);
      res.status(HttpStatus.OK).json({
          message: 'Proveedor actualizado correctamente',
          proveedor
      });
  }

}
