import { Document } from "mongoose";

export interface IStockCampos extends Document {
   readonly campo: string,
   readonly producto: string,
   readonly cantidad: number,
   readonly creatorUser: string,
   readonly updatorUser: string,
   readonly activo: boolean,
}