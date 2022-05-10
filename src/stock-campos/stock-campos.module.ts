import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { stockCamposSchema } from './schema/stock-campos.schema';
import { StockCamposController } from './stock-campos.controller';
import { StockCamposService } from './stock-campos.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'StockCampos', schema: stockCamposSchema}]),],
  controllers: [StockCamposController],
  providers: [StockCamposService]
})
export class StockCamposModule {}
