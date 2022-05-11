import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngresoProductosController } from './ingreso-productos.controller';
import { IngresoProductosService } from './ingreso-productos.service';
import { ingresoProductoSchema } from './schema/ingreso-producto.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'IngresoProducto', schema: ingresoProductoSchema}]),],
  controllers: [IngresoProductosController],
  providers: [IngresoProductosService]
})
export class IngresoProductosModule {}
