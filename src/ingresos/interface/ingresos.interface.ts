import { Document } from "mongoose";

export interface IIngreso extends Document {
   readonly nro_remito: string,
   readonly proveedor: string,
   readonly campo: string,
   readonly creatorUser: string,
   readonly updatorUser: string,
   readonly activo: boolean,
}