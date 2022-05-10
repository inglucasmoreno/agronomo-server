import { Document } from "mongoose";

export interface IIngresoProductos extends Document {
   readonly ingreso: string,
   readonly producto: string,
   readonly cantidad: number,
   readonly creatorUser: string,
   readonly updatorUser: string,
   readonly activo: boolean,
}