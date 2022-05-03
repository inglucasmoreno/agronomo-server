import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose  from 'mongoose';
import { ICampo } from './interface/campo.interface';
import { CampoDTO } from './dto/campo.dto';
import { CampoUpdateDTO } from './dto/campo-update.dto';
import { ILote } from 'src/lotes/interface/lotes.interface';

@Injectable()
export class CamposService {
  
  constructor(
    @InjectModel('Campo') private readonly campoModel: Model<ICampo>,
    @InjectModel('Lote') private readonly loteModel: Model<ILote>,
  ){}

  // Campo por ID
  async getCampo(id: string): Promise<ICampo> {
      
      const campoDB = await this.campoModel.findById(id);
      if(!campoDB) throw new NotFoundException('El campo no existe');

      const pipeline = [];

      // Campo por ID
      const idCampo = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idCampo} }) 

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

      const campo = await this.campoModel.aggregate(pipeline);
      
      return campo[0];

  }  

  // Listar campos
  async listarCampos(querys: any): Promise<ICampo[]> {
    
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

    const campos = await this.campoModel.aggregate(pipeline);
    
    return campos;

  }  

  // Crear campo
  async crearCampo(campoDTO: CampoDTO): Promise<ICampo> {   
      const nuevoCampo = new this.campoModel(campoDTO);
      const campo = await nuevoCampo.save();
      return campo;
  }

  // Actualizar campo
  async actualizarCampo(id: string, campoUpdateDTO: CampoUpdateDTO): Promise<ICampo> {

    const { activo, updatorUser } = campoUpdateDTO;

    // Se verifica si el campo a actualizar existe
    let campoDB = await this.getCampo(id);
    if(!campoDB) throw new NotFoundException('El campo no existe');
    
    // Alta o Baja de lotes relacionados
    if(activo !== undefined) {
      await this.loteModel.updateMany({ campo: id },{ activo, updatorUser });
    }
    
    const campo = await this.campoModel.findByIdAndUpdate(id, campoUpdateDTO, {new: true});
    return campo;
      
  } 

}
