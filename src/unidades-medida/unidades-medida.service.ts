import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose  from 'mongoose';
import { UnidadMedidaUpdateDTO } from './dto/unidad-medida-update.dto';
import { UnidadMedidaDTO } from './dto/unidad-medida.dto';
import { IUnidadMedida } from './interface/unidad-medida.interface';

@Injectable()
export class UnidadesMedidaService {

  constructor(@InjectModel('UnidadMedida') private readonly unidadMedidaModel: Model<IUnidadMedida>,){}

  // Unidad de medida por ID
  async getUnidad(id: string): Promise<IUnidadMedida> {
      
      const unidadDB = await this.unidadMedidaModel.findById(id);
      if(!unidadDB) throw new NotFoundException('La unidad de medida no existe');

      const pipeline = [];

      // Filtrado por ID
      const idUnidadMedida = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idUnidadMedida} }) 

      // Informacion de usuario creador
      pipeline.push({
        $lookup: { // Lookup - Propietario
            from: 'usuarios',
            localField: 'creatorUser',
            foreignField: '_id',
            as: 'creatorUser'
        }}
      );

      pipeline.push({ $unwind: '$creatorUser' });

      // Informacion de usuario actualizador
      pipeline.push({
        $lookup: { // Lookup - Propietario
            from: 'usuarios',
            localField: 'updatorUser',
            foreignField: '_id',
            as: 'updatorUser'
        }}
      );

      pipeline.push({ $unwind: '$updatorUser' });

      const unidad = await this.unidadMedidaModel.aggregate(pipeline);
      
      return unidad[0];

  }  

  // Listar unidades de medida
  async listarUnidades(querys: any): Promise<IUnidadMedida[]> {
      
      const {columna, direccion} = querys;

      const pipeline = [];
      pipeline.push({$match:{}});

      // Informacion de usuario creador
      pipeline.push({
        $lookup: { // Lookup - Propietario
            from: 'usuarios',
            localField: 'creatorUser',
            foreignField: '_id',
            as: 'creatorUser'
        }}
      );

      pipeline.push({ $unwind: '$creatorUser' });

      // Informacion de usuario actualizador
      pipeline.push({
        $lookup: { // Lookup - Propietario
          from: 'usuarios',
          localField: 'updatorUser',
          foreignField: '_id',
          as: 'updatorUser'
        }}
      );

      pipeline.push({ $unwind: '$updatorUser' });

      // Ordenando datos
      const ordenar: any = {};
      if(columna){
          ordenar[String(columna)] = Number(direccion);
          pipeline.push({$sort: ordenar});
      }      

      const unidades = await this.unidadMedidaModel.aggregate(pipeline);
      
      return unidades;
  }  

  // Crear unidad de medida
  async crearUnidad(unidadMedidaDTO: UnidadMedidaDTO): Promise<IUnidadMedida> {   
      const nuevaUnidad = new this.unidadMedidaModel(unidadMedidaDTO);
      const unidad = await nuevaUnidad.save();
      return unidad;
  }

  // Actualizar unidad de medida
  async actualizarUnidad(id: string, unidadMedidaUpdateDTO: UnidadMedidaUpdateDTO): Promise<IUnidadMedida> {

      // Se verifica si la unidad a actualizar existe
      let unidadDB = await this.getUnidad(id);
      if(!unidadDB) throw new NotFoundException('La unidad no existe');
      
      const unidad = await this.unidadMedidaModel.findByIdAndUpdate(id, unidadMedidaUpdateDTO, {new: true});
      return unidad;
      
  } 

}
