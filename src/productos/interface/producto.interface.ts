import { Document } from "mongoose";

export interface IProducto extends Document {
   readonly descripcion: string,
   readonly unidad: string,
   readonly stock_minimo: boolean,
   readonly cantidad_minima: number,
   readonly creatorUser: string,
   readonly updatorUser: string,
   readonly activo: boolean,
}