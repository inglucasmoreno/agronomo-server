import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { loteSchema } from 'src/lotes/schema/lotes.schema';
import { CamposController } from './campos.controller';
import { CamposService } from './campos.service';
import { campoSchema } from './schema/campo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Campo', schema: campoSchema}]),
    MongooseModule.forFeature([{name: 'Lote', schema: loteSchema}]),
  ],
  controllers: [CamposController],
  providers: [CamposService]
})
export class CamposModule {}
