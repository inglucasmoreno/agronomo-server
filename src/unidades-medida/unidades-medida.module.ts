import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { unidadMedidaSchema } from './schema/unidad-medida.schema';
import { UnidadesMedidaController } from './unidades-medida.controller';
import { UnidadesMedidaService } from './unidades-medida.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'UnidadMedida', schema: unidadMedidaSchema}]),],
  controllers: [UnidadesMedidaController],
  providers: [UnidadesMedidaService]
})
export class UnidadesMedidaModule {}
