import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose  from 'mongoose';
import { IStockCampos } from './interface/stock-campos.interface';
import { StockCamposDTO } from './dto/stock-campos.dto';
import { StockCamposUpdateDTO } from './dto/stock-campos-update.dto';

@Injectable()
export class StockCamposService {

  constructor(@InjectModel('StockCampos') private readonly stockCamposModel: Model<IStockCampos>,){}

  // Stock de campo por ID
  async getStockCampo(id: string): Promise<IStockCampos> {
      
      const stockCampoDB = await this.stockCamposModel.findById(id);
      if(!stockCampoDB) throw new NotFoundException('El stock de campo no existe');

      const pipeline = [];

      // Filtrado por ID
      const idStockCampo = new mongoose.Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idStockCampo} }) 

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

      const stockCampo = await this.stockCamposModel.aggregate(pipeline);
      
      return stockCampo[0];

  }  

  // Listar stock campos
  async listarStockCampos(querys: any): Promise<IStockCampos[]> {
      
      const {columna, direccion} = querys;

      const pipeline = [];
      pipeline.push({$match:{}});

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

      const productos = await this.stockCamposModel.aggregate(pipeline);
      
      return productos;
  }  

  // Listar stock por campo
  async listarStockPorCampo(id: string, querys: any): Promise<IStockCampos[]> {
    
    const {columna, direccion} = querys;

    const pipeline = [];

    // Filtrado por campo
    const idCampo = new mongoose.Types.ObjectId(id);
    pipeline.push({ $match:{ _id: idCampo} }) 

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

    const productos = await this.stockCamposModel.aggregate(pipeline);
    
    return productos;

  }  

  // Crear stock de campo
  async crearStockCampo(stockCampoDTO: StockCamposDTO): Promise<IStockCampos> {   
      const nuevoStockCampo = new this.stockCamposModel(stockCampoDTO);
      const stockCampo = await nuevoStockCampo.save();
      return stockCampo;
  }

  // Actualizar stock campo
  async actualizarStockCampo(id: string, stockCampoUpdateDTO: StockCamposUpdateDTO): Promise<IStockCampos> {

      // Se verifica si el stock campo a actualizar existe
      let stockCampoDB = await this.getStockCampo(id);
      if(!stockCampoDB) throw new NotFoundException('El stock no existe');
      
      const stockCampo = await this.stockCamposModel.findByIdAndUpdate(id, stockCampoUpdateDTO, {new: true});
      return stockCampo;
      
  } 

}
