import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngresoProductosController } from './ingreso-productos.controller';
import { IngresoProductosService } from './ingreso-productos.service';
import { ingresoProductosSchema } from './schema/ingreso-productos.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'IngresoProductos', schema: ingresoProductosSchema}]),],
  controllers: [IngresoProductosController],
  providers: [IngresoProductosService]
})
export class IngresoProductosModule {}
