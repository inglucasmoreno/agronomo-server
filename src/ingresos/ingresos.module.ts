import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngresosController } from './ingresos.controller';
import { IngresosService } from './ingresos.service';
import { ingresoSchema } from './schema/ingreso.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Ingreso', schema: ingresoSchema}]),],
  controllers: [IngresosController],
  providers: [IngresosService]
})
export class IngresosModule {}
