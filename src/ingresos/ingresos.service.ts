import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose  from 'mongoose';
import { IIngreso } from './interface/ingresos.interface';
import { IngresoDTO } from './dto/ingresos.dto';
import { IngresoUpdateDTO } from './dto/ingresos-update.dto';

@Injectable()
export class IngresosService {

  constructor(@InjectModel('Ingreso') private readonly ingresoModel: Model<IIngreso>,){}

  // Ingreso por ID
  async getIngreso(id: string): Promise<IIngreso> {
      
      const ingresoDB = await this.ingresoModel.findById(id);
      if(!ingresoDB) throw new NotFoundException('El ingreso no existe no existe');

      const pipeline = [];

      // Filtrado por ID
      const idIngreso = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idIngreso} }) 

      // Informacion de proveedor
      pipeline.push({
        $lookup: { // Lookup - Proveedor
            from: 'proveedores',
            localField: 'proveedor',
            foreignField: '_id',
            as: 'proveedor'
        }}
      );

      pipeline.push({ $unwind: '$proveedor' });

      // Informacion de campo
      pipeline.push({
        $lookup: { // Lookup - Campo
            from: 'campos',
            localField: 'campo',
            foreignField: '_id',
            as: 'campo'
        }}
      );

      pipeline.push({ $unwind: '$campo' });

      // Informacion de usuario creador
      pipeline.push({
        $lookup: { // Lookup - Usuario creador
            from: 'usuarios',
            localField: 'creatorUser',
            foreignField: '_id',
            as: 'creatorUser'
        }}
      );

      pipeline.push({ $unwind: '$creatorUser' });

      // Informacion de usuario actualizador
      pipeline.push({
        $lookup: { // Lookup - Usuario actualizador
            from: 'usuarios',
            localField: 'updatorUser',
            foreignField: '_id',
            as: 'updatorUser'
        }}
      );

      pipeline.push({ $unwind: '$updatorUser' });

      const ingreso = await this.ingresoModel.aggregate(pipeline);
      
      return ingreso[0];

  }  

  // Listar ingresos
  async listarIngresos(querys: any): Promise<IIngreso[]> {
      
      const {columna, direccion} = querys;

      const pipeline = [];
      pipeline.push({$match:{}});

      // Informacion de proveedor
      pipeline.push({
        $lookup: { // Lookup - Proveedor
            from: 'proveedores',
            localField: 'proveedor',
            foreignField: '_id',
            as: 'proveedor'
        }}
      );

      pipeline.push({ $unwind: '$proveedor' });

      // Informacion de campo
      pipeline.push({
        $lookup: { // Lookup - Campo
            from: 'campos',
            localField: 'campo',
            foreignField: '_id',
            as: 'campo'
        }}
      );

      pipeline.push({ $unwind: '$campo' });
      
      // Informacion de usuario creador
      pipeline.push({
        $lookup: { // Lookup - Usuario creador
            from: 'usuarios',
            localField: 'creatorUser',
            foreignField: '_id',
            as: 'creatorUser'
        }}
      );

      pipeline.push({ $unwind: '$creatorUser' });

      // Informacion de usuario actualizador
      pipeline.push({
        $lookup: { // Lookup - Usuario actualizador
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

      const ingresos = await this.ingresoModel.aggregate(pipeline);
      
      return ingresos;
  }  

  // Crear ingreso
  async crearIngreso(ingresoDTO: IngresoDTO): Promise<IIngreso> {   
      const nuevoIngreso = new this.ingresoModel(ingresoDTO);
      const ingreso = await nuevoIngreso.save();
      return ingreso;
  }

  // Actualizar ingreso
  async actualizarIngreso(id: string, ingresoUpdateDTO: IngresoUpdateDTO): Promise<IIngreso> {

      // Se verifica si el ingreso a actualizar existe
      let ingresoDB = await this.getIngreso(id);
      if(!ingresoDB) throw new NotFoundException('El ingreso no existe');
      
      const ingreso = await this.ingresoModel.findByIdAndUpdate(id, ingresoUpdateDTO, {new: true});
      return ingreso;
      
  } 

}
