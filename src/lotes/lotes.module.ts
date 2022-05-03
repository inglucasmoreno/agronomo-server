import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LotesController } from './lotes.controller';
import { LotesService } from './lotes.service';
import { loteSchema } from './schema/lotes.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Lotes', schema: loteSchema}]),],
  controllers: [LotesController],
  providers: [LotesService]
})
export class LotesModule {}
