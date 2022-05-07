import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProveedor } from './interface/proveedor.interface';
import * as mongoose  from 'mongoose';
import { ProveedorDTO } from './dto/proveedor.dto';
import { ProveedorUpdateDTO } from './dto/proveedor-update.dto';

@Injectable()
export class ProveedoresService {

  constructor(@InjectModel('Proveedor') private readonly proveedorModel: Model<IProveedor>,){}

  // Proveedor por ID
  async getProveedor(id: string): Promise<IProveedor> {
      
      const proveedorDB = await this.proveedorModel.findById(id);
      if(!proveedorDB) throw new NotFoundException('El proveedor no existe');

      const pipeline = [];

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

      // Filtrado por ID
      const idProveedor = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idProveedor} }) 

      const proveedor = await this.proveedorModel.aggregate(pipeline);
      
      return proveedor[0];

  }  

  // Listar proveedor
  async listarProveedores(querys: any): Promise<IProveedor[]> {
      
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

      const proveedores = await this.proveedorModel.aggregate(pipeline);
      
      return proveedores;
  }  

  // Crear proveedor
  async crearProveedor(proveedorDTO: ProveedorDTO): Promise<IProveedor> {   
      const nuevoProveedor = new this.proveedorModel(proveedorDTO);
      const proveedor = await nuevoProveedor.save();
      return proveedor;
  }

  // Actualizar proveedor
  async actualizarProveedor(id: string, proveedorUpdateDTO: ProveedorUpdateDTO): Promise<IProveedor> {

      // Se verifica si el proveedor a actualizar existe
      let proveedorDB = await this.getProveedor(id);
      if(!proveedorDB) throw new NotFoundException('El proveedor no existe');
      
      const proveedor = await this.proveedorModel.findByIdAndUpdate(id, proveedorUpdateDTO, {new: true});
      return proveedor;
      
  } 


}
