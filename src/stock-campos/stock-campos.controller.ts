import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StockCamposUpdateDTO } from './dto/stock-campos-update.dto';
import { StockCamposDTO } from './dto/stock-campos.dto';
import { StockCamposService } from './stock-campos.service';

@ApiTags('stock-campos')
@Controller('stock-campos')
export class StockCamposController {
  
  constructor( private stockCamposService: StockCamposService ){}

  // Stock campo por ID - Productos
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Stock de campo obtenido correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de stock de campo', type: 'string'})
  @Get('/:id')
  async getStockCampo(@Res() res, @Param('id') stockCampoID) {
      const producto = await this.stockCamposService.getStockCampo(stockCampoID);
      res.status(HttpStatus.OK).json({
          message: 'Producto obtenido correctamente',
          producto
      });
  }

  // Listar stock por campo - Productos
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de stock por campo correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de campo', type: 'string'})
  @Get('/campo/:id')
  async listarStockPorCampo(@Res() res, @Query() querys) {
      const productos = await this.stockCamposService.listarStockCampos(querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de productos de stock por campo correcto',
          productos
      });
  }

  // Listar stock de campos - Productos
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listado de stock de campos correcto' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @Get('/')
  async listarStockCampos(@Res() res, @Query() querys) {
      const productos = await this.stockCamposService.listarStockCampos(querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de productos de stock correcto',
          productos
      });
  }

  // Crear stock campo - Productos
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Crear stock correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiBody({ type: StockCamposDTO })
  @Post('/')
  async crearStockCampo(@Res() res, @Body() stockCamposDTO: StockCamposDTO ) {       
      const stockCampo = await this.stockCamposService.crearStockCampo(stockCamposDTO);        
      res.status(HttpStatus.CREATED).json({
          message: 'Stock campo creado correctamente',
          stockCampo
      });
  }

  // Actualizar stock campo - Productos
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Stock campo actualizado correctamente' })
  @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
  @ApiParam({name: 'id', required: true, description: 'Identificador de stock campo', type: 'string'})
  @Put('/:id')
  async actualizarStockCampo(@Res() res, @Body() stockCamposUpdateDTO: StockCamposUpdateDTO, @Param('id') stockCampoID ) {
      const producto = await this.stockCamposService.actualizarStockCampo(stockCampoID, stockCamposUpdateDTO);
      res.status(HttpStatus.OK).json({
          message: 'Stock campo actualizado correctamente',
          producto
      });
  }

}
