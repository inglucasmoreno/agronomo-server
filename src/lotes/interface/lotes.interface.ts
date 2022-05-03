import { Document } from "mongoose";

export interface ILote extends Document {
   readonly descripcion: string,
   readonly campo: string,
   readonly coordenadas: Array<any>,
   readonly superficie: number,
   readonly color: string,
   readonly creatorUser: string,
   readonly updatorUser: string,
   readonly activo: boolean,
}