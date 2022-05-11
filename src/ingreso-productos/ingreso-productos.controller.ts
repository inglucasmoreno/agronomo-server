import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IngresoProductoUpdateDTO } from './dto/ingreso-producto-update.dto';
import { IngresoProductoDTO } from './dto/ingreso-producto.dto';
import { IngresoProductosService } from './ingreso-productos.service';

@ApiTags('ingreso-productos')
@Controller('ingreso-productos')
export class IngresoProductosController {

  constructor( private ingresoProductosService: IngresoProductosService ){}

    // Productos por ID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Producto obtenido correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de producto', type: 'string'})
    @Get('/:id')
    async getProducto(@Res() res, @Param('id') productoID) {
        const producto = await this.ingresoProductosService.getProducto(productoID);
        res.status(HttpStatus.OK).json({
            message: 'Prodicto obtenido correctamente',
            producto
        });
    }

    // Listar productos de todos los ingresos
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de productos correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/')
    async listarProductos(@Res() res, @Query() querys) {
        const productos = await this.ingresoProductosService.listarProductos(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de productos correcto',
            productos
        });
    }

    // Crear producto
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'Producto creado correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiBody({ type: IngresoProductoDTO })
    @Post('/')
    async crearProducto(@Res() res, @Body() ingresoProductoDTO: IngresoProductoDTO ) {       
        const producto = await this.ingresoProductosService.crearProducto(ingresoProductoDTO);        
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
    async actualizarProducto(@Res() res, @Body() ingresoProductoUpdateDTO: IngresoProductoUpdateDTO, @Param('id') productoID ) {
        const producto = await this.ingresoProductosService.actualizarProducto(productoID, ingresoProductoUpdateDTO);
        res.status(HttpStatus.OK).json({
            message: 'Producto actualizado correctamente',
            producto
        });
    }

}
