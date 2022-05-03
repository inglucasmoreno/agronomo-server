import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose  from 'mongoose';
import { ILote } from './interface/lotes.interface';
import { LoteDTO } from './dto/lotes.dto';
import { LoteUpdateDTO } from './dto/lotes-update.dto';

@Injectable()
export class LotesService {

  
  constructor(@InjectModel('Lotes') private readonly loteModel: Model<ILote>,){}

  // Lote por ID
  async getLote(id: string): Promise<ILote> {
      
      const loteDB = await this.loteModel.findById(id);
      if(!loteDB) throw new NotFoundException('El lote no existe');

      const pipeline = [];

      // Filtrado por Lotes
      const idLote = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idLote} }) 

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

      const lote = await this.loteModel.aggregate(pipeline);
      
      return lote[0];

  }  

  // Lote por campo
  async getLotePorCampo(idCampo: string, querys: any): Promise<ILote[]> {

    const {columna, direccion} = querys;
    
    const pipeline = [];

    // Filtrado por Lotes
    const campo = new mongoose.Types.ObjectId(idCampo);
    pipeline.push({ $match:{ campo } }) 

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

    const lotes = await this.loteModel.aggregate(pipeline);
    
    return lotes;

  }  

  // Listar lotes
  async listarLotes(querys: any): Promise<ILote[]> {
      
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

      const lotes = await this.loteModel.aggregate(pipeline);
      
      return lotes;
  }  

  // Crear lote
  async crearLote(loteDTO: LoteDTO): Promise<ILote> {        
      const nuevoLote = new this.loteModel(loteDTO);
      const lote = await nuevoLote.save();
      return lote;
  }

  // Baja/Alta completa de lotes
  async altaBajaCompleta(campo: string, estado: string): Promise<any> {
    
    let lotes: any;

    if(estado === 'alta'){ // Alta de lotes
      lotes = await this.loteModel.updateMany({ campo }, { activo: true } , {new: true}); 
    }else{                 // Baja de lotes
      lotes = await this.loteModel.updateMany({ campo }, { activo: false } , {new: true}); 
    }
    
    return lotes;

  }

  // Actualizar lote
  async actualizarLote(id: string, loteUpdateDTO: LoteUpdateDTO): Promise<ILote> {
      
      // Se verifica si el lote a actualizar existe
      let loteDB = await this.getLote(id);
      if(!loteDB) throw new NotFoundException('El lote no existe');
      
      const lote = await this.loteModel.findByIdAndUpdate(id, loteUpdateDTO, {new: true});
      return lote;  
  
  } 

}
