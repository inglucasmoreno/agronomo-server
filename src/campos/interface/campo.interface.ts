import { Document } from "mongoose";

export interface ICampo extends Document {
   readonly descripcion: string,
   readonly coordenadas: Array<any>,
   readonly superficie: number,
   readonly color: string,
   readonly creatorUser: string,
   readonly updatorUser: string,
   readonly activo: boolean,
}