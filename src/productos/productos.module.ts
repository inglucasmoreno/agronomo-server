import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { productoSchema } from './schema/producto.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Producto', schema: productoSchema}])],
  controllers: [ProductosController],
  providers: [ProductosService]
})
export class ProductosModule {}
