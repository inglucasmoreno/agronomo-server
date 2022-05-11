import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose  from 'mongoose';
import { IIngresoProducto } from './interface/ingreso-producto.interface';
import { IngresoProductoDTO } from './dto/ingreso-producto.dto';
import { IngresoProductoUpdateDTO } from './dto/ingreso-producto-update.dto';

@Injectable()
export class IngresoProductosService {
  
  constructor(@InjectModel('IngresoProducto') private readonly ingresoProductosModel: Model<IIngresoProducto>,){}

  // Producto de ingreso por ID
  async getProducto(id: string): Promise<IIngresoProducto> {
      
      const productoDB = await this.ingresoProductosModel.findById(id);
      if(!productoDB) throw new NotFoundException('El producto no existe');

      const pipeline = [];

      // Informacion de ingreso
      pipeline.push({
        $lookup: { // Lookup - Ingreso
            from: 'ingresos',
            localField: 'ingreso',
            foreignField: '_id',
            as: 'ingreso'
        }}
      );

      pipeline.push({ $unwind: '$ingreso' });

      // Informacion de producto
      pipeline.push({
        $lookup: { // Lookup - Producto
            from: 'productos',
            localField: 'producto',
            foreignField: '_id',
            as: 'producto'
        }}
      );

      pipeline.push({ $unwind: '$producto' });

      // Filtrado por ID
      const idProducto = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idProducto} }) 

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

      const producto = await this.ingresoProductosModel.aggregate(pipeline);
      
      return producto[0];

  }  

  // Listar productos
  async listarProductos(querys: any): Promise<IIngresoProducto[]> {
      
      const {columna, direccion} = querys;

      const pipeline = [];
      pipeline.push({$match:{}});

      // Informacion de ingreso
      pipeline.push({
        $lookup: { // Lookup - Ingreso
            from: 'ingresos',
            localField: 'ingreso',
            foreignField: '_id',
            as: 'ingreso'
        }}
      );

      pipeline.push({ $unwind: '$ingreso' });

      // Informacion de producto
      pipeline.push({
        $lookup: { // Lookup - Producto
            from: 'productos',
            localField: 'producto',
            foreignField: '_id',
            as: 'producto'
        }}
      );

      pipeline.push({ $unwind: '$producto' });

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

      const productos = await this.ingresoProductosModel.aggregate(pipeline);
      
      return productos;
  }  

  // Crear producto en ingreso
  async crearProducto(ingresoProductoDTO: IngresoProductoDTO): Promise<IIngresoProducto> {   
      const nuevoProducto = new this.ingresoProductosModel(ingresoProductoDTO);
      const producto = await nuevoProducto.save();
      return producto;
  }

  // Actualizar producto
  async actualizarProducto(id: string, ingresoProductoUpdateDTO: IngresoProductoUpdateDTO): Promise<IngresoProductoUpdateDTO> {

      // Se verifica si el producto a actualizar existe
      let productoDB = await this.getProducto(id);
      if(!productoDB) throw new NotFoundException('El producto no existe');
      
      const producto = await this.ingresoProductosModel.findByIdAndUpdate(id, ingresoProductoUpdateDTO, {new: true});
      return producto;
      
  } 
}
