import { Document } from "mongoose";

export interface IProveedor extends Document {
   readonly descripcion: string,
   readonly tipo_identificacion: string,
   readonly identificacion: string,
   readonly telefono: string,
   readonly direccion: string,
   readonly creatorUser: string,
   readonly updatorUser: string,
   readonly activo: boolean,
}