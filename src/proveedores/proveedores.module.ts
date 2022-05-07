import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProveedoresController } from './proveedores.controller';
import { ProveedoresService } from './proveedores.service';
import { proveedorSchema } from './schema/proveedor.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Proveedor', schema: proveedorSchema}]),],
  controllers: [ProveedoresController],
  providers: [ProveedoresService]
})
export class ProveedoresModule {}
