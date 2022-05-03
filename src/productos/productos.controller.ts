import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductoUpdateDTO } from './dto/producto-update.dto';
import { ProductoDTO } from './dto/producto.dto';
import { ProductosService } from './productos.service';

@ApiTags('productos')
@Controller('productos')
export class ProductosController {

  constructor( private productosService: ProductosService ){}

  // Productos por ID
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Producto obtenido correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de producto', type: 'string'})
  @Get('/:id')
  async getProducto(@Res() res, @Param('id') productoID) {
      const producto = await this.productosService.getProducto(productoID);
      res.status(HttpStatus.OK).json({
          message: 'Producto obtenido correctamente',
          producto
      });
  }

  // Listar productos
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de productos correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/')
  async listarProductos(@Res() res, @Query() querys) {
      const productos = await this.productosService.listarProductos(querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de productos',
          productos
      });
  }

  // Crear producto
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Producto creado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiBody({ type: ProductoDTO })
  @Post('/')
  async crearProducto(@Res() res, @Body() productoDTO: ProductoDTO ) {       
      const producto = await this.productosService.crearProducto(productoDTO);        
      res.status(HttpStatus.CREATED).json({
          message: 'Producto creado correctamente',
          producto
      });
  }

  // Actualizar producto
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Producto actualizado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de producto', type: 'string'})
  @Put('/:id')
  async actualizarProducto(@Res() res, @Body() productoUpdateDTO: ProductoUpdateDTO, @Param('id') productoID ) {
      const producto = await this.productosService.actualizarProducto(productoID, productoUpdateDTO);
      res.status(HttpStatus.OK).json({
          message: 'Producto actualizado correctamente',
          producto
      });
  }


}
