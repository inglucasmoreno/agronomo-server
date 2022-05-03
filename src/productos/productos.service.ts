import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose  from 'mongoose';
import { IProducto } from './interface/producto.interface';
import { ProductoDTO } from './dto/producto.dto';
import { ProductoUpdateDTO } from './dto/producto-update.dto';

@Injectable()
export class ProductosService {

  constructor(@InjectModel('Producto') private readonly productoModel: Model<IProducto>,){}

  // Producto por ID
  async getProducto(id: string): Promise<IProducto> {
      
      const productoDB = await this.productoModel.findById(id);
      if(!productoDB) throw new NotFoundException('El producto no existe');

      const pipeline = [];

      // Filtrado por ID
      const idProducto = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idProducto} }) 

      // Informacion de unidad de medida
      pipeline.push({
        $lookup: { // Lookup 
            from: 'unidades-medida',
            localField: 'unidad',
            foreignField: '_id',
            as: 'unidad'
        }}
      );

      pipeline.push({ $unwind: '$unidad' });

      // Informacion de usuario creador
      pipeline.push({
        $lookup: { // Lookup
            from: 'usuarios',
            localField: 'creatorUser',
            foreignField: '_id',
            as: 'creatorUser'
        }}
      );

      pipeline.push({ $unwind: '$creatorUser' });

      // Informacion de usuario actualizador
      pipeline.push({
        $lookup: { // Lookup
            from: 'usuarios',
            localField: 'updatorUser',
            foreignField: '_id',
            as: 'updatorUser'
        }}
      );

      pipeline.push({ $unwind: '$updatorUser' });

      const producto = await this.productoModel.aggregate(pipeline);
      
      return producto[0];

  }  

  // Listar producto
  async listarProductos(querys: any): Promise<IProducto[]> {
      
      const {columna, direccion} = querys;

      const pipeline = [];
      pipeline.push({$match:{}});

      // Informacion de unidad de medida
      pipeline.push({
        $lookup: { // Lookup
            from: 'unidades-medida',
            localField: 'unidad',
            foreignField: '_id',
            as: 'unidad'
        }}
      );

      pipeline.push({ $unwind: '$unidad' });

      // Informacion de usuario creador
      pipeline.push({
        $lookup: { // Lookup
            from: 'usuarios',
            localField: 'creatorUser',
            foreignField: '_id',
            as: 'creatorUser'
        }}
      );

      pipeline.push({ $unwind: '$creatorUser' });

      // Informacion de usuario actualizador
      pipeline.push({
        $lookup: { // Lookup
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

      const productos = await this.productoModel.aggregate(pipeline);
      
      return productos;
  }  

  // Crear producto
  async crearProducto(productoDTO: ProductoDTO): Promise<IProducto> {   
      const nuevoProducto = new this.productoModel(productoDTO);
      const producto = await nuevoProducto.save();
      return producto;
  }

  // Actualizar producto
  async actualizarProducto(id: string, productoUpdateDTO: ProductoUpdateDTO): Promise<IProducto> {

      // Se verifica si el producto a actualizar existe
      let productoDB = await this.getProducto(id);
      if(!productoDB) throw new NotFoundException('El producto no existe');
      
      const producto = await this.productoModel.findByIdAndUpdate(id, productoUpdateDTO, {new: true});
      return producto;
      
  } 


}
